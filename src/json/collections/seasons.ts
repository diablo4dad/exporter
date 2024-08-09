import {composeName, D4DadCollection, D4DadCollectionItem, generateId} from "../index.js";
import {D4Dependencies, getEntity} from "../../d4.js";
import {challengeToCollection} from "../factory/challenges.js";
import {storeToCollectionItems} from "../factory/bundles.js";
import {hashCode, identity, pipe} from "../../helper.js";
import {achievementToCollectionItems} from "../factory/achievements.js";

enum Category {
  GENERAL = "General",
  SHOP_ITEMS = "Shop",
  PROMOTIONAL = "Promotional",
  SEASONS = "Season",
  CHALLENGE = "Challenge",
  // sub-categories
  BATTLE_PASS = "Battle Pass",
  SEASON_JOURNEY = "Season Journey",
  REPUTATION = "Reputation",
}

type CollectionDescriptor = {
  name: string,
  category: Category,
  description?: string,
  season?: number,
  outOfRotation?: boolean,
  children?: CollectionDescriptor[],
  postHook?: (collection: D4DadCollection) => D4DadCollection,
  challengeFile?: string,
  challengeFileFlatten?: boolean,
  reputationFile?: string,
  storeProducts?: string[],
  achievements?: string[],
  items?: string[][],
}

function generateIdForItem() {
  return (collectionItem: D4DadCollectionItem) => ({
    ...collectionItem,
    id: generateId(),
  });
}

function generateClaim(deps: D4Dependencies) {
  return (descriptor: CollectionDescriptor) => {
    return (ci: D4DadCollectionItem) => {
      return ci;
    }
  }
}

function parseChallengeFile(deps: D4Dependencies) {
  return (descriptor: CollectionDescriptor): D4DadCollection[] => {
    if (descriptor.challengeFile === undefined) {
      return [];
    }

    return pipe(
      getEntity(descriptor.challengeFile, deps.challenges),
      (c) => c.arCategories.map(challengeToCollection(deps)(c)),
    );
  }
}

function parseStoreFiles(deps: D4Dependencies) {
  return (descriptor: CollectionDescriptor): D4DadCollectionItem[] => {
    if (descriptor.storeProducts === undefined) {
      return [];
    }

    return descriptor.storeProducts
      .map(sp => getEntity(sp, deps.storeProducts))
      .map(storeToCollectionItems(deps))
      .flat();
  }
}

function parseAchievementFiles(deps: D4Dependencies) {
  return (descriptor: CollectionDescriptor): D4DadCollectionItem[] => {
    if (descriptor.achievements === undefined) {
      return [];
    }

    return descriptor.achievements
      .map(a => getEntity(a, deps.achievements))
      .map(achievementToCollectionItems(deps))
      .flat();
  };
}

function parseExtraItems(deps: D4Dependencies) {
  return (descriptor: CollectionDescriptor): D4DadCollectionItem[] => {
    return (descriptor.items ?? []).map(g => {
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

function parseCollectionItems(deps: D4Dependencies) {
  return (descriptor: CollectionDescriptor): D4DadCollectionItem[] => {
    const challengesItems = descriptor.challengeFileFlatten
      ? parseChallengeFile(deps)(descriptor).map(c => c.collectionItems).flat()
      : [];
    const storeItems = parseStoreFiles(deps)(descriptor);
    const achievementItems = parseAchievementFiles(deps)(descriptor);
    const extraItems = parseExtraItems(deps)(descriptor);

    return [
      ...challengesItems,
      ...storeItems,
      ...achievementItems,
      ...extraItems,
    ];
  }
}

function buildCollection(deps: D4Dependencies) {
  return (descriptor: CollectionDescriptor): D4DadCollection => {
    const challenges = descriptor.challengeFileFlatten ? [] : parseChallengeFile(deps)(descriptor);
    const postHook = descriptor.postHook ?? identity;

    const collection = {
      id: hashCode(descriptor.name + descriptor.description),
      name: descriptor.name,
      category: descriptor.category,
      description: descriptor.description,
      collectionItems: parseCollectionItems(deps)(descriptor)
        .map(generateIdForItem())
        .map(generateClaim(deps)(descriptor)),
      subcollections: challenges.concat(...(descriptor.children?.map(buildCollection(deps)) ?? [])),
    };

    return pipe(
      collection,
      postHook,
    );
  }
}

export function buildSeasonsCollection(deps: D4Dependencies) {
  return MANIFEST.map(buildCollection(deps));
}

const SEASON05: CollectionDescriptor = {
  name: "Season of the Infernal Hordes",
  description: "Season 5 starting August 6th, 2024",
  category: Category.SEASONS,
  season: 5,
  children: [
    {
      name: "Battle Pass #5",
      category: Category.BATTLE_PASS,
      challengeFileFlatten: true,
      challengeFile: "json\\base\\meta\\Challenge\\Season5_Rewards.cha.json",
      storeProducts: [
        "json\\base\\meta\\StoreProduct\\Bundle_Battlepass_Accelerated_s05.prd.json",
      ],
    },
    {
      name: "Season Journey #5",
      category: Category.SEASON_JOURNEY,
      challengeFileFlatten: true,
      challengeFile: "json\\base\\meta\\Challenge\\Season5.cha.json",
    },
  ],
}

const SEASON04: CollectionDescriptor = {
  name: "Season of Loot Reborn",
  description: "Season 4 starting May 14th, 2024",
  category: Category.SEASONS,
  season: 4,
  outOfRotation: true,
  children: [
    {
      name: "Battle Pass #4",
      category: Category.BATTLE_PASS,
      challengeFileFlatten: true,
      challengeFile: "json\\base\\meta\\Challenge\\Season4_Rewards.cha.json",
      storeProducts: ["json\\base\\meta\\StoreProduct\\Bundle_Battlepass_Accelerated_s04.prd.json"],
    },
    {
      name: "Season Journey #4",
      category: Category.SEASON_JOURNEY,
      challengeFileFlatten: true,
      challengeFile: "json\\base\\meta\\Challenge\\Season4.cha.json",
      achievements: ["json\\base\\meta\\Achievement\\Feat_S04_AllJourneyTasks.ach.json"],
      items: [["json\\base\\meta\\Item\\mnt_uniq28_trophy.itm.json"]],
    },
    {
      name: "Reputation Board #4",
      category: Category.REPUTATION,
      reputationFile: "json\\base\\meta\\Reputation\\IronWolves_Helltide_Reputation.rep.json",
      items: [["json\\base\\meta\\Item\\mnt_stor232_trophy.itm.json"]],
    },
  ],
}

const SEASON03 = {
  name: "Season of the Construct",
  description: "Season 3 starting January 23rd, 2024",
  category: Category.SEASONS,
  season: 3,
  outOfRotation: true,
  children: [
    {
      name: "Battle Pass #3",
      category: Category.BATTLE_PASS,
      challengeFileFlatten: true,
      challengeFile: "json\\base\\meta\\Challenge\\Season3_Rewards.cha.json",
      storeProducts: [
        "json\\base\\meta\\StoreProduct\\Bundle_Battlepass_Accelerated_s03.prd.json",
      ],
    },
    {
      name: "Season Journey #3",
      category: Category.SEASON_JOURNEY,
      challengeFileFlatten: true,
      challengeFile: "json\\base\\meta\\Challenge\\Season3.cha.json",
      achievements: [
        "json\\base\\meta\\Achievement\\Feat_S03_AllJourneyTasks.ach.json",
        "json\\base\\meta\\Achievement\\Feat_S03_QuestComplete.ach.json",
      ],
    },
  ],
}

const SEASON02: CollectionDescriptor = {
  name: "Season of Blood",
  description: "Season 2 starting October 17th, 2023",
  category: Category.SEASONS,
  season: 2,
  outOfRotation: true,
  children: [
    {
      name: "Battle Pass #2",
      category: Category.BATTLE_PASS,
      challengeFileFlatten: true,
      challengeFile: "json\\base\\meta\\Challenge\\Season2_Rewards.cha.json",
      storeProducts: [
        "json\\base\\meta\\StoreProduct\\Bundle_Battlepass_Accelerated_s02.prd.json",
      ],
    },
    {
      name: "Season Journey #2",
      category: Category.SEASON_JOURNEY,
      challengeFileFlatten: true,
      challengeFile: "json\\base\\meta\\Challenge\\Season2.cha.json",
      achievements: [
        "json\\base\\meta\\Achievement\\Feat_S02_AllJourneyTasks.ach.json",
        "json\\base\\meta\\Achievement\\Feat_S02_QuestComplete.ach.json",
        "json\\base\\meta\\Achievement\\Hidden_S02_QuestComplete_MountTrophy.ach.json",
      ],
    },
    {
      name: "Reputation Board #2",
      category: Category.REPUTATION,
      reputationFile: "json\\base\\meta\\Reputation\\SME_Vampzone_Reputation.rep.json",
      achievements: [
        "json\\base\\meta\\Achievement\\S02_Hidden_Reputation_Level4Titles.ach.json",
        "json\\base\\meta\\Achievement\\S02_Hidden_Reputation_Level18Titles.ach.json",
      ],
    },
  ],
}

const SEASON01: CollectionDescriptor = {
  name: "Season of Malignant",
  description: "Season 1 starting July 20th, 2023",
  category: Category.SEASONS,
  season: 1,
  outOfRotation: true,
  children: [
    {
      name: "Battle Pass #1",
      category: Category.BATTLE_PASS,
      challengeFileFlatten: true,
      challengeFile: "json\\base\\meta\\Challenge\\Season1_Rewards.cha.json",
      storeProducts: [
        "json\\base\\meta\\StoreProduct\\Bundle_Battlepass_Accelerated_s01.prd.json",
      ],
    },
    {
      name: "Season Journey #1",
      category: Category.SEASON_JOURNEY,
      challengeFileFlatten: true,
      challengeFile: "json\\base\\meta\\Challenge\\Season1.cha.json",
      achievements: [
        "json\\base\\meta\\Achievement\\Feat_S01_QuestComplete.ach.json",
        "json\\base\\meta\\Achievement\\Feat_S01_AllJourneyTasks.ach.json",
        "json\\base\\meta\\Achievement\\Hidden_S01_QuestComplete_MountTrophy.ach.json",
      ],
    },
  ],
}

const MANIFEST: CollectionDescriptor[] = [
  SEASON05,
  SEASON04,
  SEASON03,
  SEASON02,
  SEASON01,
]
