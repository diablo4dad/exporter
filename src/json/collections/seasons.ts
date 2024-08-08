import {D4DadCollection, D4DadCollectionItem, generateId} from "../index.js";
import {D4Dependencies} from "../../d4.js";
import {challengeToCollection} from "../factory/challenges.js";
import {storeToCollectionItems} from "../factory/bundles.js";

enum CollectionType {
  SEASON,
  BATTLE_PASS,
  SEASON_JOURNEY,
  REPUTATION,
}

type CollectionDescriptor = {
  name: string,
  type: CollectionType,
  description?: string,
  outOfRotation?: boolean,
  collections?: CollectionDescriptor[],
}

type SeasonCollectionDescriptor = Omit<CollectionDescriptor, "collections" | "type"> & {
  type: CollectionType.SEASON,
  season: number,
  children: SeasonCollections[],
}

type SeasonCollections =
  BattlePassCollectionDescriptor |
  SeasonJourneyCollectionDescriptor |
  ReputationCollectionDescriptor;

type BattlePassCollectionDescriptor = CollectionDescriptor & {
  type: CollectionType.BATTLE_PASS,
  challengeFile: string,
  acceleratedBattlePassFile: string,

}

type SeasonJourneyCollectionDescriptor = CollectionDescriptor & {
  type: CollectionType.SEASON_JOURNEY,
  challengeFile: string,
}

type ReputationCollectionDescriptor = CollectionDescriptor & {
  type: CollectionType.REPUTATION,
}

function mapClaim(descriptor: CollectionDescriptor) {
  switch (descriptor.type) {
    case CollectionType.BATTLE_PASS:
      return "Battle Pass";
    case CollectionType.SEASON_JOURNEY:
      return "Season Journey";
    default:
      return "TODO";
  }
}

function mixInInherentFieldsToItem(descriptor: CollectionDescriptor) {
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
          })))
        .map(mixInInherentFieldsToItem(descriptor))
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
        .flat()
        .map(mixInInherentFieldsToItem(descriptor)),
      subcollections: [],
    }
  }
}

export function buildSeasonCollection(deps: D4Dependencies) {
  return (descriptor: SeasonCollectionDescriptor): D4DadCollection => {
     return {
       id: descriptor.season + 15000,
       name: descriptor.name,
       category: "Season",
       description: descriptor.description,
       collectionItems: [],
       subcollections: descriptor.children.map(buildSeasonCollectionType(deps)),
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
      default:
        throw new Error("Unhandled collection descriptor: " + CollectionType[descriptor.type])
    }
  }
}

export const SEASONS: SeasonCollectionDescriptor[] = [{
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
