import { pipe } from '../../../helper.js';
import { Category } from '../../constants.js';
import { CollectionDescriptor, D4DadCollection, D4DadCollectionItem } from '../../struct.js';

const DESCRIPTIONS: ReadonlyMap<string, string> = new Map([
  ['Classes', 'Class achievements'],
  ['Monsters', 'Monster achievements'],
  ['Quests', 'Quest achievements'],
]);

const MONSTER_ORDER: ReadonlyArray<string> = [
  'Bandits',
  'Cannibals',
  'Cultists',
  'Demons',
  'Drowned',
  'Fallen',
  'Ghosts',
  'Goatmen',
  'Knights',
  'Skeletons',
  'Snakes',
  'Spiders',
  'Vampires',
  'Werewolves',
  'Zombies',
];

const PATCHES: Partial<D4DadCollectionItem>[] = [
  {
    // Diabolic Roamer
    items: [1427993, 1427999],
    unobtainable: true,
  },
  {
    // Enthusiastic Admirer
    items: [1340629, 1340632],
    unobtainable: true,
  },
  {
    // Awoken Celebrant
    items: [1825839, 1825837],
    outOfRotation: true,
  },
  {
    // Terrible Genius
    items: [1753873, 1753875],
    outOfRotation: true,
  },
  {
    // The Head of Malphas
    items: [845909],
    outOfRotation: true,
  },
  {
    // Frigid Reveler
    items: [1701105, 1701107],
    outOfRotation: true,
  },
  {
    // Zenith
    items: [1755694],
    outOfRotation: true,
  },
  {
    // Zir's
    items: [1755696],
    outOfRotation: true,
  },
  {
    // Butcher's Meat Hook
    items: [1237403],
    outOfRotation: true,
  },
  {
    // Hunter's Ally
    items: [1610515, 1221977],
    outOfRotation: true,
  },
  {
    // Vampiric Blade
    items: [1636168, 999486],
    outOfRotation: true,
  },
  {
    // Reinforced Demonbane
    items: [1907417, 1907429],
    outOfRotation: true,
  },
  {
    // Mother's Inked
    items: [1525050, 1525052],
    outOfRotation: true,
  },
  {
    // Cormond's Friend
    items: [1520590, 1221973],
    outOfRotation: true,
  },
  {
    // Malignant Purifier
    items: [1489117, 1508550],
    outOfRotation: true,
  },
  {
    // The Cry of Ashava
    items: [1482434],
    outOfRotation: true,
  },
  {
    // Beta Wolf Pack
    items: [1433914],
    outOfRotation: true,
  },
  {
    // Early Voyager
    items: [1408465, 1408463],
    outOfRotation: true,
  },
  {
    // Initial Casualty
    items: [1408472, 1408479],
    outOfRotation: true,
  },
  {
    // Triune Trouble
    items: [1287112, 1287114],
    claimDescription: '[Hidden] Complete the Way of the Three questline in Kehjistan.',
  },
  {
    // Iron Wolf
    items: [996341, 1287106],
    claimDescription: '[Hidden] Complete quests for the Iron Wolves in Kehjistan.',
  },
  {
    // Hatreds Chosen
    items: [1320174, 1320176],
    claimDescription: "[Hidden] Become Hatred's Chosen.",
  },
  {
    // The Hateful Stone
    items: [2092909],
    claimDescription: '[Hidden] Reach Paragon Level 300.',
  },
  {
    // Celebrated
    items: [2096025],
    claimDescription: '[Hidden] Open a Greater Cache during the Citadel Community Challenge.',
  },
];

const findNamedCollection = (collection: D4DadCollection, name: string) => {
  const found1 = collection.subcollections.find((sc) => sc.name === name);
  if (found1) {
    return found1;
  }

  const found2 = collection.subcollections.reduce((a, c) => c.subcollections.find((sc) => sc.name === name) ?? a);
  if (found2) {
    return found2;
  }

  throw new Error(`Collection "${name}" not found.`);
};

const findCollectionItem = (collection: D4DadCollection, itemIds: number[]) => {
  const ci = collection.collectionItems.find((ci) => ci.items.every((i) => itemIds.includes(i)));
  if (!ci) {
    throw new Error(`Collection Items ${itemIds.join(', ')} not found.`);
  }

  return ci;
};

function assignDescription(collection: D4DadCollection): D4DadCollection {
  return {
    ...collection,
    subcollections: collection.subcollections.map((sc) => ({
      ...sc,
      description: DESCRIPTIONS.get(sc.name) ?? `${sc.name} achievements`,
    })),
  };
}

function sortChallenges(collection: D4DadCollection): D4DadCollection {
  return {
    ...collection,
    subcollections: collection.subcollections.map((sc) => {
      if (sc.name === 'Monsters') {
        return {
          ...sc,
          subcollections: sc.subcollections.sort((a, b) => {
            if (MONSTER_ORDER.indexOf(a.name) < MONSTER_ORDER.indexOf(b.name)) return -1;
            if (MONSTER_ORDER.indexOf(a.name) > MONSTER_ORDER.indexOf(b.name)) return 1;
            return 0;
          }),
        };
      }

      // no changes
      return sc;
    }),
  };
}

function mergeConquerorsCrest(collection: D4DadCollection): D4DadCollection {
  const challenge = findNamedCollection(collection, 'Feats of Strength');
  const innerChallenge = findNamedCollection(challenge, 'Legacy');
  const crest = findCollectionItem(innerChallenge, [1821571]);

  const filteredItems = innerChallenge.collectionItems.filter((ci) => !ci.items.every((i) => i === 1821571));
  const mergedCrest = {
    ...crest,
    claimDescription: 'Appear in the first 100 places in any of the Trial leaderboards.',
  };

  // impure!
  innerChallenge.collectionItems = [...filteredItems, mergedCrest];

  return collection;
}

function moveHiddenAchievements(collection: D4DadCollection): D4DadCollection {
  const sideQuests = findNamedCollection(collection, 'Side Quests');
  const pvp = findNamedCollection(collection, 'PvP');
  const hidden = findNamedCollection(collection, 'Hidden');
  const challenge = findNamedCollection(findNamedCollection(collection, 'Challenge'), 'Challenge');
  const citadel = findNamedCollection(collection, 'First Khazra Citadel');

  const triuneTrouble = findCollectionItem(hidden, [1287112, 1287114]);
  const ironWolf = findCollectionItem(hidden, [996341, 1287106]);
  const hatredsChosen = findCollectionItem(hidden, [1320174, 1320176]);
  const theHatefulStone = findCollectionItem(hidden, [2092909]);
  const celebrated = findCollectionItem(hidden, [2096025]);
  const khazraHelm = findCollectionItem(hidden, [1955200]);
  const khazraBoots = findCollectionItem(hidden, [1955198]);

  // impure!
  sideQuests.collectionItems.push(triuneTrouble, ironWolf);
  pvp.collectionItems.push(hatredsChosen);
  challenge.collectionItems.push(theHatefulStone);
  citadel.collectionItems.push(celebrated);
  citadel.collectionItems.push(khazraHelm);
  citadel.collectionItems.push(khazraBoots);

  // prefer opt-out to catch new hidden achievement rewards
  const itemsToRemove = [
    [1287112, 1287114], // triune trouble
    [1320174, 1320176], // hatreds chosen
    [996341, 1287106], // iron wolf
    [1523527, 1520593], // wrathful heart
    [1257432], // bloody liquid steed
    [1610513, 1610521], // shadow vampire
    [1638773, 1638778], // reborn nightspawn
    [1638776, 1638780], // eternal bloodhunter
    [921365], // varshan's severed head
    [843632], // vir's bloody skull
    [1904653], // blazon of victory
    [1647914, 1647921, 1647925, 1647930, 1647933], // the dragons tapestry
    [1975292], // abyssal bastion
    [2096025], // celebrated
    [2096027], // patron
    [2092909], // the hateful stone
    [1955200], // Greater Helm of the Khazra
    [1955198], // Boots of the Khazra
  ];

  // impure!
  hidden.collectionItems = hidden.collectionItems.filter(
    (ci) => !itemsToRemove.some((ir) => ir.every((i) => ci.items.includes(i))),
  );

  return collection;
}

const CHALLENGE: CollectionDescriptor = {
  name: 'Challenge',
  description: 'Challenges',
  category: Category.CHALLENGE,
  challengeFile: 'json\\base\\meta\\Challenge\\Global.cha.json',
  patches: PATCHES,
  postHook: (collection) => {
    return pipe(collection, moveHiddenAchievements, mergeConquerorsCrest, assignDescription, sortChallenges);
  },
};

export default CHALLENGE;
