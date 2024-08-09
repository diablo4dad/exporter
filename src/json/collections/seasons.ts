import {composeName, D4DadCollection, D4DadCollectionItem, generateId} from "../index.js";
import {D4Dependencies, getEntity} from "../../d4.js";
import {challengeToCollection} from "../factory/challenges.js";
import {storeToCollectionItems} from "../factory/bundles.js";
import {hashCode, identity, pipe} from "../../helper.js";
import {achievementToCollectionItems} from "../factory/achievements.js";

enum CollectionType {
  SEASON,
  BATTLE_PASS,
  SEASON_JOURNEY,
  REPUTATION,
  SEASON_FEATS,
}

type CollectionDescriptor = {
  name: string,
  type: CollectionType,
  description?: string,
  outOfRotation?: boolean,
  collections?: CollectionDescriptor[],
  postHook?: (collection: D4DadCollection) => D4DadCollection,
  inclusions?: string[][],
}

type SeasonCollectionDescriptor = Omit<CollectionDescriptor, "collections" | "type"> & {
  type: CollectionType.SEASON,
  season: number,
  children: SeasonCollections[],
}

type SeasonCollections =
  BattlePassCollectionDescriptor |
  SeasonJourneyCollectionDescriptor |
  ReputationCollectionDescriptor |
  SeasonFeatsCollectionDescriptor;

type BattlePassCollectionDescriptor = Omit<CollectionDescriptor, "builderFunc"> & {
  type: CollectionType.BATTLE_PASS,
  challengeFile: string,
  acceleratedBattlePassFile: string,
}

type SeasonJourneyCollectionDescriptor = Omit<CollectionDescriptor, "builderFunc"> & {
  type: CollectionType.SEASON_JOURNEY,
  challengeFile: string,
}

type ReputationCollectionDescriptor = CollectionDescriptor & {
  type: CollectionType.REPUTATION,
  reputationFile: string,
}

type SeasonFeatsCollectionDescriptor = CollectionDescriptor & {
  type: CollectionType.SEASON_FEATS,
  achievements: string[],
}

function mapClaim(descriptor: CollectionDescriptor) {
  switch (descriptor.type) {
    case CollectionType.BATTLE_PASS:
      return "Battle Pass";
    case CollectionType.SEASON_JOURNEY:
      return "Season Journey";
    case CollectionType.REPUTATION:
      return "Reputation Board";
    case CollectionType.SEASON_FEATS:
      return "Feat of Strength";
    case CollectionType.SEASON:
      return "Season";
  }
}

function mixInInherentFieldsToItem<T extends CollectionDescriptor>(descriptor: T) {
  return (collectionItem: D4DadCollectionItem) => ({
    ...collectionItem,
    id: generateId(),
    claim: mapClaim(descriptor),
    outOfRotation: descriptor.outOfRotation ? true : undefined,
  });
}

function mixInInherentFieldsToCollection(descriptor: CollectionDescriptor) {
  return (collection: D4DadCollection): D4DadCollection => ({
    ...collection,
    subcollections: collection.subcollections.map(mixInInherentFieldsToCollection(descriptor)),
    collectionItems: collection.collectionItems.map(mixInInherentFieldsToItem(descriptor)),
  });
}

function parseExtraItems(deps: D4Dependencies) {
  return (descriptor: CollectionDescriptor): D4DadCollectionItem[] => {
    return (descriptor.inclusions ?? []).map(g => {
      const items = g.map(i => getEntity(i, deps.items));

      return {
        id: -1,
        name: composeName(deps)(...items),
        claim: "TODO",
        items: items.map(i => i.__snoID__),
      };
    });
  };
}

function buildBattlePassCollection(deps: D4Dependencies) {
  return (descriptor: BattlePassCollectionDescriptor): D4DadCollection => {
    const challengeFile = deps.challenges.get(descriptor.challengeFile);
    if (challengeFile === undefined) {
      throw new Error(descriptor.challengeFile + " not found.");
    }

    const storeFile = deps.storeProducts.get(descriptor.acceleratedBattlePassFile);
    if (storeFile === undefined) {
      throw new Error(descriptor.acceleratedBattlePassFile + " not found.");
    }

    return {
      id: challengeFile.__snoID__,
      name: descriptor.name,
      description: descriptor.description,
      subcollections: [],
      collectionItems: challengeFile.arCategories
        .map(challengeToCollection(deps)(challengeFile))
        .map(c => c.collectionItems)
        .flat()
        .concat(...storeToCollectionItems(deps)(storeFile)
          .map(ci => ({
            ...ci,
            claimDescription: "Included with the Accelerated Battle Pass.",
          }))),
    };
  }
}

function buildSeasonJourneyCollection(deps: D4Dependencies) {
  return (descriptor: SeasonJourneyCollectionDescriptor): D4DadCollection => {
    const challengeFile = deps.challenges.get(descriptor.challengeFile);
    if (challengeFile === undefined) {
      throw new Error(descriptor.challengeFile + " not found.");
    }

    return {
      id: challengeFile.__snoID__,
      name: descriptor.name,
      description: descriptor.description,
      collectionItems: challengeFile.arCategories
        .map(challengeToCollection(deps)(challengeFile))
        .map(c => c.collectionItems)
        .flat(),
      subcollections: [],
    }
  }
}

function buildReputationCollection(deps: D4Dependencies) {
  return (descriptor: ReputationCollectionDescriptor): D4DadCollection => {
    const reputationFile = deps.reputation.get(descriptor.reputationFile);
    if (reputationFile === undefined) {
      throw new Error(descriptor.reputationFile + " not found.");
    }

    return {
      id: reputationFile.__snoID__,
      name: descriptor.name,
      description: descriptor.description,
      // reputation files only contain treasure classes
      // these collections must be constructed explicitly
      collectionItems: [],
      subcollections: [],
    }
  }
}

function buildSeasonFeatsOfStrengthCollection(deps: D4Dependencies) {
  return (descriptor: SeasonFeatsCollectionDescriptor): D4DadCollection => {
    return {
      id: hashCode(descriptor.name),
      name: descriptor.name,
      description: descriptor.description,
      collectionItems: descriptor.achievements
        .map(a => getEntity(a, deps.achievements))
        .map(achievementToCollectionItems(deps))
        .flat(),
      subcollections: [],
    };
  }
}

export function buildSeasonsCollection(deps: D4Dependencies) {
  return createSeasonManifest(deps).map(buildSeasonCollection(deps));
}

function buildSeasonCollection(deps: D4Dependencies) {
  return (descriptor: SeasonCollectionDescriptor): D4DadCollection => {
     return {
       id: descriptor.season + 15000,
       name: descriptor.name,
       category: "Season",
       description: descriptor.description,
       collectionItems: [],
       subcollections: descriptor.children
         .map(dc => pipe(dc,
           buildSeasonCollectionType(deps),
           (dc.postHook ?? identity),
           (value => ({
             ...value,
             collectionItems: value.collectionItems
               .concat(...parseExtraItems(deps)(dc))
               .map(mixInInherentFieldsToItem(dc)),
           }))
         )),
     };
  }
}

function buildSeasonCollectionType(deps: D4Dependencies) {
  return (descriptor: SeasonCollections): D4DadCollection => {
    switch (descriptor.type) {
      case CollectionType.BATTLE_PASS:
        return buildBattlePassCollection(deps)(descriptor);
      case CollectionType.SEASON_JOURNEY:
        return buildSeasonJourneyCollection(deps)(descriptor);
      case CollectionType.REPUTATION:
        return buildReputationCollection(deps)(descriptor);
      case CollectionType.SEASON_FEATS:
        return buildSeasonFeatsOfStrengthCollection(deps)(descriptor);
    }
  }
}

export function createSeasonManifest(deps: D4Dependencies): SeasonCollectionDescriptor[] {
  return [{
    name: "Season of the Infernal Hordes",
    description: "Season 5 starting August 6th, 2024",
    type: CollectionType.SEASON,
    season: 5,
    children: [{
      name: "Battle Pass #5",
      type: CollectionType.BATTLE_PASS,
      challengeFile: "json\\base\\meta\\Challenge\\Season5_Rewards.cha.json",
      acceleratedBattlePassFile: "json\\base\\meta\\StoreProduct\\Bundle_Battlepass_Accelerated_s05.prd.json",
    }, {
      name: "Season Journey #5",
      type: CollectionType.SEASON_JOURNEY,
      challengeFile: "json\\base\\meta\\Challenge\\Season5.cha.json",
    }],
  }, {
    name: "Season of Loot Reborn",
    description: "Season 4 starting May 14th, 2024",
    type: CollectionType.SEASON,
    season: 4,
    outOfRotation: true,
    children: [{
      name: "Battle Pass #4",
      type: CollectionType.BATTLE_PASS,
      challengeFile: "json\\base\\meta\\Challenge\\Season4_Rewards.cha.json",
      acceleratedBattlePassFile: "json\\base\\meta\\StoreProduct\\Bundle_Battlepass_Accelerated_s04.prd.json",
    }, {
      name: "Season Journey #4",
      type: CollectionType.SEASON_JOURNEY,
      challengeFile: "json\\base\\meta\\Challenge\\Season4.cha.json",
      postHook: (collection: D4DadCollection) => ({
        ...collection,
        collectionItems: [
          ...collection.collectionItems,
          {
            id: generateId(),
            name: "Reinforced Demonbane",
            items: [1907417, 1907429],
            claim: "Season Journey",
            claimDescription: "Complete every Season Journey objective.",
          }, {
            id: generateId(),
            name: "Blood Maiden's Mantle",
            items: [1891999],
            claim: "Season Journey",
            claimDescription: "Dropped by the last boss of the Seasonal Questline.",
          },
        ],
      }),
    }, {
      name: "Reputation Board #4",
      type: CollectionType.REPUTATION,
      reputationFile: "json\\base\\meta\\Reputation\\IronWolves_Helltide_Reputation.rep.json",
      inclusions: [
        ["json\\base\\meta\\Item\\mnt_stor232_trophy.itm.json"],
      ],
    }],
  }, {
    name: "Season of the Construct",
    description: "Season 3 starting January 23rd, 2024",
    type: CollectionType.SEASON,
    season: 3,
    outOfRotation: true,
    children: [{
      name: "Battle Pass #3",
      type: CollectionType.BATTLE_PASS,
      challengeFile: "json\\base\\meta\\Challenge\\Season3_Rewards.cha.json",
      acceleratedBattlePassFile: "json\\base\\meta\\StoreProduct\\Bundle_Battlepass_Accelerated_s03.prd.json",
    }, {
      name: "Season Journey #3",
      type: CollectionType.SEASON_JOURNEY,
      challengeFile: "json\\base\\meta\\Challenge\\Season3.cha.json",

    }, {
      name: "Feats of Strength #3",
      type: CollectionType.SEASON_FEATS,
      achievements: [
        "json\\base\\meta\\Achievement\\Feat_S03_AllJourneyTasks.ach.json",
        "json\\base\\meta\\Achievement\\Feat_S03_QuestComplete.ach.json",
      ],
    }],
  }, {
    name: "Season of Blood",
    description: "Season 2 starting October 17th, 2023",
    type: CollectionType.SEASON,
    season: 2,
    outOfRotation: true,
    children: [{
      name: "Battle Pass #2",
      type: CollectionType.BATTLE_PASS,
      challengeFile: "json\\base\\meta\\Challenge\\Season2_Rewards.cha.json",
      acceleratedBattlePassFile: "json\\base\\meta\\StoreProduct\\Bundle_Battlepass_Accelerated_s02.prd.json",
    }, {
      name: "Season Journey #2",
      type: CollectionType.SEASON_JOURNEY,
      challengeFile: "json\\base\\meta\\Challenge\\Season2.cha.json",
    }],
  }, {
    name: "Season of Malignant",
    description: "Season 1 starting July 20th, 2023",
    type: CollectionType.SEASON,
    season: 1,
    outOfRotation: true,
    children: [{
      name: "Battle Pass #1",
      type: CollectionType.BATTLE_PASS,
      challengeFile: "json\\base\\meta\\Challenge\\Season1_Rewards.cha.json",
      acceleratedBattlePassFile: "json\\base\\meta\\StoreProduct\\Bundle_Battlepass_Accelerated_s01.prd.json",
    }, {
      name: "Season Journey #1",
      type: CollectionType.SEASON_JOURNEY,
      challengeFile: "json\\base\\meta\\Challenge\\Season1.cha.json",
    }],
  }];
}
