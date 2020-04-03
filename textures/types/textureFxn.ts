export type TextureFxn = (x: number, y: number) => number;

export type RegionFxn = (x: number, y: number) => boolean;

export function getRegion(text: TextureFxn, cutoff: number) {
  return (x: number, y: number) => text(x, y) > cutoff;
}

export function negate(text: TextureFxn) {
  return (x: number, y: number) => 1 - text(x, y);
}