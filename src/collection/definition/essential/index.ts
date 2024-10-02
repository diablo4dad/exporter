import { CollectionDescriptor } from '../../index.js';
import ZONE from './zone.js';
import MONSTER from './monster.js';
import EVENT from './event.js';
import PVP from './pvp.js';
import ACTIVITY from './activity.js';
import WEAPON from './weapon.js';
import ARMOR from './armor.js';
import TEJAL from './tejal.js';
import SOFTWARE from './software.js';
import BETA from './beta.js';

const ESSENTIAL: ReadonlyArray<CollectionDescriptor> = [
  ZONE,
  MONSTER,
  EVENT,
  PVP,
  ACTIVITY,
  ARMOR,
  WEAPON,
  TEJAL,
  SOFTWARE,
  BETA,
];

export default ESSENTIAL;
