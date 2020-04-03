import { PlaneMap } from "../../planeMap/planeMap";

export type TextureFxn = PlaneMap<number>;

export type RegionFxn = PlaneMap<boolean>;

export function getRegion(text: TextureFxn, cutoff: number) {
  return (x: number, y: number) => text(x, y) > cutoff;
}

export function negate(text: TextureFxn) {
  return (x: number, y: number) => 1 - text(x, y);
}