import { D4Translation } from '../d4data/struct.js';

export function getTextFromStl(stl: D4Translation, label: string, fallback = ''): string {
  return (
    stl.arStrings
      .filter((s) => s.szLabel === label)
      .map((s) => s.szText)
      .pop() ?? fallback
  );
}
