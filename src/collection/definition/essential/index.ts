import ACTIVITY from './activity.js';
import ARMOR from './armor.js';
import BETA from './beta.js';
import CITADEL from './citadel.js';
import EVENT from './event.js';
import MONSTER from './monster.js';
import PVP from './pvp.js';
import SOFTWARE from './software.js';
import TEJAL from './tejal.js';
import WEAPON from './weapon.js';
import ZONE from './zone.js';

import { CollectionDescriptor } from '../../struct.js';

const ESSENTIAL: ReadonlyArray<CollectionDescriptor> = [
  ZONE,
  MONSTER,
  EVENT,
  CITADEL,
  PVP,
  ACTIVITY,
  ARMOR,
  WEAPON,
  TEJAL,
  SOFTWARE,
  BETA,
];

export default ESSENTIAL;
