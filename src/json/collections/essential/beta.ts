import { Category, CollectionDescriptor } from '../../index.js';

const BETA: CollectionDescriptor = {
  "name": "Open Beta",
  "description": "Incentives for participating in the open beta weekends",
  "category": Category.GENERAL,
  "items": [
    [
      "json\\base\\meta\\Item\\mnt_stor125_trophy.itm.json"
    ],
    [
      "json\\base\\meta\\Item\\trophy_glo001_stor.itm.json"
    ],
    [
      "json\\base\\meta\\PlayerTitle\\prefix_initial.pt.json",
      "json\\base\\meta\\PlayerTitle\\suffix_casualty.pt.json"
    ],
    [
      "json\\base\\meta\\PlayerTitle\\prefix_early.pt.json",
      "json\\base\\meta\\PlayerTitle\\suffix_voyager.pt.json"
    ]
  ],
  "patches": [
    {
      "items": [
        1482434
      ],
      "claim": "Promotional",
      "claimDescription": "Kill Ashava during the Server-Slam.",
      "outOfRotation": true
    },
    {
      "items": [
        1433914
      ],
      "claim": "Promotional",
      "claimDescription": "Reach level 20 during the open beta.",
      "outOfRotation": true
    },
    {
      "items": [
        1408472,
        1408479
      ],
      "claim": "Promotional",
      "claimDescription": "Reach Kyovashad with one character.",
      "outOfRotation": true
    },
    {
      "items": [
        1408465,
        1408463
      ],
      "claim": "Promotional",
      "claimDescription": "Reach level 20 during the open beta.",
      "outOfRotation": true
    }
  ],
  "children": []
};

export default BETA;
