import { Category, CollectionDescriptor } from '../../index.js';

const BETA: CollectionDescriptor = {
  name: 'Open Beta',
  description: 'Incentives for participating in the open beta weekends',
  category: Category.GENERAL,
  claim: 'Promotional',
  outOfRotation: true,
  items: [
    ['json\\base\\meta\\Item\\mnt_stor125_trophy.itm.json'],
    ['json\\base\\meta\\Item\\trophy_glo001_stor.itm.json'],
    [
      'json\\base\\meta\\PlayerTitle\\prefix_initial.pt.json',
      'json\\base\\meta\\PlayerTitle\\suffix_casualty.pt.json',
    ],
    [
      'json\\base\\meta\\PlayerTitle\\prefix_early.pt.json',
      'json\\base\\meta\\PlayerTitle\\suffix_voyager.pt.json',
    ],
  ],
  patches: [
    {
      items: [1482434],
      claimDescription: 'Kill Ashava during the Server-Slam.',
    },
    {
      items: [1433914],
      claimDescription: 'Reach level 20 during the open beta.',
    },
    {
      items: [1408472, 1408479],
      claimDescription: 'Reach Kyovashad with one character.',
    },
    {
      items: [1408465, 1408463],
      claimDescription: 'Reach level 20 during the open beta.',
    },
  ],
};

export default BETA;
