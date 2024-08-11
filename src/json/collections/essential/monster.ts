import { Category, CollectionDescriptor } from '../../index.js';

const WORLD_BOSS: CollectionDescriptor = {
  name: 'World Boss',
  description: 'Transmogs dropped by Ashava, Avarice and Wandering Death',
  category: Category.MONSTER_DROP,
  claim: 'World Boss Drop',
  items: [
    ['json\\base\\meta\\Item\\mnt_amor53_horse.itm.json'],
    ['json\\base\\meta\\Item\\mnt_uniq53_trophy.itm.json'],
    ['json\\base\\meta\\Item\\mnt_amor55_horse.itm.json'],
    ['json\\base\\meta\\Item\\mnt_uniq55_trophy.itm.json'],
    ['json\\base\\meta\\Item\\mnt_amor54_horse.itm.json'],
    ['json\\base\\meta\\Item\\mnt_uniq54_trophy.itm.json'],
  ],
  patches: [
    {
      items: [1221715],
      claimDescription: 'Dropped by Ashava.',
    },
    {
      items: [1222125],
      claimDescription: 'Dropped by Ashava.',
    },
    {
      items: [1221723],
      claimDescription: 'Dropped by Wandering Death.',
    },
    {
      items: [1222138],
      claimDescription: 'Dropped by Wandering Death.',
    },
    {
      items: [1221719],
      claimDescription: 'Dropped by Wandering Avarice.',
    },
    {
      items: [1222132],
      claimDescription: 'Dropped by Wandering Avarice.',
    },
  ],
};

const DUNGEON_BOSS: CollectionDescriptor = {
  name: 'Dungeon Boss',
  description: 'Transmogs dropped by dungeon bosses',
  category: Category.MONSTER_DROP,
  claim: 'Dungeon Boss',
  items: [
    ['json\\base\\meta\\Item\\mnt_stor111_trophy.itm.json'],
    ['json\\base\\meta\\Item\\mnt_amor103_horse_stor.itm.json'],
    ['json\\base\\meta\\Item\\Helm_Cosmetic_Generic_96.itm.json'],
    ['json\\base\\meta\\Item\\mnt_stor006_trophy.itm.json'],
    ['json\\base\\meta\\Item\\mnt_stor005_trophy.itm.json'],
    ['json\\base\\meta\\Item\\mnt_stor002_horse.itm.json'],
  ],
  patches: [
    {
      items: [1555173],
      claimDescription: 'Dropped by Echo of Varshan.',
    },
    {
      items: [1278727],
      claimDescription: 'Dropped by Grigoire the Galvanic Saint.',
    },
    {
      items: [1689310],
      claimDescription: 'Dropped by Lord Zir.',
    },
    {
      items: [1463239],
      claimDescription: 'Dropped by The Beast in the Ice.',
    },
    {
      items: [1588046],
      claimDescription: 'Dropped by The Beast in the Ice.',
    },
    {
      items: [1583610],
      claim: 'Uber Boss Drop',
      claimDescription: 'Dropped by Duriel, King of Maggots.',
    },
  ],
};

const RARE_MONSTER: CollectionDescriptor = {
  name: 'Rare Monster',
  description: 'Transmogs dropped by Treasure Goblins, The Butcher and Rare Spawns.',
  category: Category.MONSTER_DROP,
  items: [
    ['json\\base\\meta\\Item\\MountReins_DecayHorse.itm.json'],
    ['json\\base\\meta\\Item\\mnt_amor61_horse.itm.json'],
    ['json\\base\\meta\\Item\\mnt_uniq61_trophy.itm.json'],
    ['json\\base\\meta\\Item\\mnt_amor56_horse.itm.json'],
    ['json\\base\\meta\\Item\\mnt_uniq56_trophy.itm.json'],
    ['json\\base\\meta\\Item\\Rarespawn_Reward_1HDagger_Scorpion.itm.json'],
    ['json\\base\\meta\\Item\\Rarespawn_Reward_1HMace_BanditMelee.itm.json'],
  ],
  patches: [
    {
      items: [1327374],
      claimDescription: 'Dropped by Treasure Goblins.',
    },
    {
      items: [1221732],
      claimDescription: 'Dropped by Treasure Goblins.',
    },
    {
      items: [1222154],
      claimDescription: 'Dropped by Treasure Goblins.',
    },
    {
      items: [1221727],
      claimDescription: 'Dropped by The Butcher.',
    },
    {
      items: [1222146],
      claimDescription: 'Dropped by The Butcher.',
    },
    {
      items: [1103798],
      claimDescription: 'Dropped by Nine-Eyes.',
    },
    {
      items: [1093991],
      claimDescription: 'Dropped by "Wrathful" Osgar Reede.',
    },
  ],
};

const MONSTER: CollectionDescriptor = {
  name: 'Monsters',
  description: 'Transmogs dropped from monsters',
  category: Category.GENERAL,
  children: [
    WORLD_BOSS,
    DUNGEON_BOSS,
    RARE_MONSTER,
  ],
};

export default MONSTER;
