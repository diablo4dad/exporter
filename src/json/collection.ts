import {D4DadCollection} from "./index.js";
import {D4Dependencies} from "../d4.js";
import {challengeToCollection} from "./factory/challenges.js";

type BuilderFunc = (deps: D4Dependencies) => (descriptor: CollectionDescriptor) => D4DadCollection;

type CollectionDescriptor = {
  name: string,
  description?: string,
  season?: number,
  outOfRotation?: boolean,
  target?: string,
  builderFunc?: BuilderFunc,
  subcollections?: CollectionDescriptor[],
}

const parseBattlePass = (deps: D4Dependencies) => {
  return (descriptor: CollectionDescriptor): D4DadCollection => {
    if (descriptor.target === undefined) {
      throw new Error("Collection Descriptor does not contain a target.");
    }

    const challengeFile = deps.challenges.get(descriptor.target);
    if (challengeFile === undefined) {
      throw new Error(descriptor.target + " not found.");
    }

    return {
      id: challengeFile.__snoID__,
      name: descriptor.name,
      description: descriptor.description,
      collectionItems: [], // never any items in the top level
      subcollections: challengeFile.arCategories.map(c => challengeToCollection(deps)(challengeFile, c)),
    }
  }
}

const SEASONS: CollectionDescriptor[] = [{
  name: "Season of the Infernal Hordes",
  description: "Season 5 starting August 6th, 2024",
  season: 5,
  subcollections: [{
    name: "Battle Pass #5",
    target: "json\\base\\meta\\Challenge\\Season5_Rewards.cha.json",
    builderFunc: parseBattlePass,
  }, {
    name: "Season Journey #5",
    target: "json\\base\\meta\\Challenge\\Season5.cha.json",
    builderFunc: parseBattlePass,
  }],
}, {
  name: "Season of Loot Reborn",
  description: "Season 4 starting May 14th, 2024",
  season: 4,
  outOfRotation: true,
  subcollections: [{
    name: "Battle Pass #4",
    target: "json\\base\\meta\\Challenge\\Season4_Rewards.cha.json",
    builderFunc: parseBattlePass,
  }, {
    name: "Season Journey #4",
    target: "json\\base\\meta\\Challenge\\Season4.cha.json",
    builderFunc: parseBattlePass,
  }],
}, {
  name: "Season of the Construct",
  description: "Season 3 starting January 23rd, 2024",
  season: 3,
  outOfRotation: true,
  subcollections: [{
    name: "Battle Pass #3",
    target: "json\\base\\meta\\Challenge\\Season3_Rewards.cha.json",
    builderFunc: parseBattlePass,
  }, {
    name: "Season Journey #3",
    target: "json\\base\\meta\\Challenge\\Season3.cha.json",
    builderFunc: parseBattlePass,
  }],
}, {
  name: "Season of Blood",
  description: "Season 2 starting October 17th, 2023",
  season: 2,
  outOfRotation: true,
  subcollections: [{
    name: "Battle Pass #2",
    target: "json\\base\\meta\\Challenge\\Season2_Rewards.cha.json",
    builderFunc: parseBattlePass,
  }, {
    name: "Season Journey #2",
    target: "json\\base\\meta\\Challenge\\Season2.cha.json",
    builderFunc: parseBattlePass,
  }],
}, {
  name: "Season of Malignant",
  description: "Season 1 starting July 20th, 2023",
  season: 1,
  outOfRotation: true,
  subcollections: [{
    name: "Battle Pass #1",
    target: "json\\base\\meta\\Challenge\\Season1_Rewards.cha.json",
    builderFunc: parseBattlePass,
  }, {
    name: "Season Journey #1",
    target: "json\\base\\meta\\Challenge\\Season2.cha.json",
    builderFunc: parseBattlePass,
  }],
}];

export function parseSeasonCollections(deps: D4Dependencies): D4DadCollection[] {
  return SEASONS.map(s => {
    if (s.subcollections === undefined) {
      return [];
    }

    return s.subcollections.map(sc => {
      if (sc.target === undefined) {
        throw new Error("Season subcollection has no target defined.");
      }

      const meta = deps.challenges.get(sc.target);
      if (meta === undefined) {
        throw new Error("Could not locate " + sc.target);
      }

      if (sc.builderFunc === undefined) {
        throw new Error("Season subcollection has no builder function defined.");
      }

      return sc.builderFunc(deps)(sc);
    })
  }).flat();
}
