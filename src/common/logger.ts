import { DEBUG_ON, RAISE_ON_ERROR } from '../config.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function captureError(message?: any, ...optionalParams: any[]) {
  if (RAISE_ON_ERROR) {
    console.debug(message, ...optionalParams);
    throw new Error(message);
  }

  console.error(message, ...optionalParams);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function captureSoftError(message?: any, ...optionalParams: any[]) {
  if (DEBUG_ON) {
    console.debug(message, ...optionalParams);
  }
}
