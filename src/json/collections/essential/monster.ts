import {Category} from "../../index.js";

const WORLD_BOSS = {
  "name": "World Boss",
  "description": "Transmogs dropped by Ashava, Avarice and Wandering Death",
  "category": Category.MONSTER_DROP,
  "items": [
    ["json\\base\\meta\\Item\\mnt_amor53_horse.itm.json"],
    ["json\\base\\meta\\Item\\mnt_uniq53_trophy.itm.json"],
    ["json\\base\\meta\\Item\\mnt_amor55_horse.itm.json"],
    ["json\\base\\meta\\Item\\mnt_uniq55_trophy.itm.json"],
    ["json\\base\\meta\\Item\\mnt_amor54_horse.itm.json"],
    ["json\\base\\meta\\Item\\mnt_uniq54_trophy.itm.json"],
  ],
  "patches": [
    {
      "items": [1221715],
      "claim": "World Boss Drop",
      "claimDescription": "Dropped by Ashava.",
    },
    {
      "items": [1222125],
      "claim": "World Boss Drop",
      "claimDescription": "Dropped by Ashava.",
    },
    {
      "items": [1221723],
      "claim": "World Boss Drop",
      "claimDescription": "Dropped by Wandering Death.",
    },
    {
      "items": [1222138],
      "claim": "World Boss Drop",
      "claimDescription": "Dropped by Wandering Death.",
    },
    {
      "items": [1221719],
      "claim": "World Boss Drop",
      "claimDescription": "Dropped by Wandering Avarice.",
    },
    {
      "items": [1222132],
      "claim": "World Boss Drop",
      "claimDescription": "Dropped by Wandering Avarice.",
    },
  ],
};

const DUNGEON_BOSS = {
  "name": "Dungeon Boss",
  "description": "Transmogs dropped by dungeon bosses",
  "category": Category.MONSTER_DROP,
  "items": [
    ["json\\base\\meta\\Item\\mnt_stor111_trophy.itm.json"],
    ["json\\base\\meta\\Item\\mnt_amor103_horse_stor.itm.json"],
    ["json\\base\\meta\\Item\\Helm_Cosmetic_Generic_96.itm.json"],
    ["json\\base\\meta\\Item\\mnt_stor006_trophy.itm.json"],
    ["json\\base\\meta\\Item\\mnt_stor005_trophy.itm.json"],
    ["json\\base\\meta\\Item\\mnt_stor002_horse.itm.json"]
  ],
  "patches": [
    {
      "items": [1583610],
      "claim": "Uber Boss Drop",
    },
  ],
};

const RARE_MONSTER = {
  "name": "Rare Monster",
  "description": "Transmogs dropped by Treasure Goblins, The Butcher and Rare Spawns.",
  "category": Category.MONSTER_DROP,
  "items": [
    ["json\\base\\meta\\Item\\MountReins_DecayHorse.itm.json"],
    ["json\\base\\meta\\Item\\mnt_amor61_horse.itm.json"],
    ["json\\base\\meta\\Item\\mnt_uniq61_trophy.itm.json"],
    ["json\\base\\meta\\Item\\mnt_amor56_horse.itm.json"],
    ["json\\base\\meta\\Item\\mnt_uniq56_trophy.itm.json"],
    ["json\\base\\meta\\Item\\Rarespawn_Reward_1HDagger_Scorpion.itm.json"],
    ["json\\base\\meta\\Item\\Rarespawn_Reward_1HMace_BanditMelee.itm.json"],
  ],
  "patches": [
    {
      "items": [1327374],
      "claim": "Monster Drop",
      "claimDescription": "Dropped by Treasure Goblins."
    },
    {
      "items": [1221732],
      "claim": "Monster Drop",
      "claimDescription": "Dropped by Treasure Goblins."
    },
    {
      "items": [1222154],
      "claim": "Monster Drop",
      "claimDescription": "Dropped by Treasure Goblins."
    },
    {
      "items": [1221727],
      "claim": "Monster Drop",
      "claimDescription": "Dropped by The Butcher.",
    },
    {
      "items": [1222146],
      "claim": "Monster Drop",
      "claimDescription": "Dropped by The Butcher."
    },
    {
      "items": [1103798],
      "claim": "Monster Drop",
      "claimDescription": "Dropped by Nine-Eyes.",
    },
    {
      "items": [1093991],
      "claim": "Monster Drop",
      "claimDescription": "Dropped by \"Wrathful\" Osgar Reede.",
    }
  ],
};

const MONSTERS = {
  "name": "Monsters",
  "description": "Transmogs dropped from monsters",
  "category": Category.GENERAL,
  "children": [
    WORLD_BOSS,
    DUNGEON_BOSS,
    RARE_MONSTER,
  ],
};

export default MONSTERS;
