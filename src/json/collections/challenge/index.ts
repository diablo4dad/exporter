import { Category, CollectionDescriptor, D4DadCollection } from '../../index.js';
import { pipe } from '../../../helper.js';

const DESCRIPTIONS: ReadonlyMap<string, string> = new Map([
  ["Classes", "Class achievements"],
  ["Monsters", "Monster achievements"],
  ["Quests", "Quest achievements"],
]);

const MONSTER_ORDER: ReadonlyArray<string> = [
  "Bandits",
  "Cannibals",
  "Cultists",
  "Demons",
  "Drowned",
  "Fallen",
  "Ghosts",
  "Goatmen",
  "Knights",
  "Skeletons",
  "Snakes",
  "Spiders",
  "Vampires",
  "Werewolves",
  "Zombies",
];

function createDescription(collection: D4DadCollection): string {
  return DESCRIPTIONS.get(collection.name) ?? `${collection.name} achievements`;
}

function assignDescription(collection: D4DadCollection): D4DadCollection {
  return ({
    ...collection,
    description: createDescription(collection),
  });
}

function sortChallenges(collection: D4DadCollection): D4DadCollection {
  if (collection.name === "Monsters") {
    return {
      ...collection,
      subcollections: collection.subcollections.sort((a, b) => {
        if (MONSTER_ORDER.indexOf(a.name) < MONSTER_ORDER.indexOf(b.name)) return -1;
        if (MONSTER_ORDER.indexOf(a.name) > MONSTER_ORDER.indexOf(b.name)) return 1;
        return 0;
      }),
    };
  }

  // no changes
  return collection;
}

const CHALLENGE: CollectionDescriptor = {
  name: 'Challenge',
  description: 'Challenges',
  category: Category.CHALLENGE,
  challengeFile: "json\\base\\meta\\Challenge\\Global.cha.json",
  patches: [
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
  ],
  postHook: collection => {
    return {
      ...collection,
      subcollections: collection.subcollections.map(sc => pipe(
        sc,
        assignDescription,
        sortChallenges,
      )),
    };
  },
};

export default CHALLENGE;
