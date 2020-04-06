import { PlaneMap } from "../../planeMap/planeMap";

export type TextureFxn = PlaneMap<number>;

export type RegionFxn = PlaneMap<boolean>;

export function getRegion(text: TextureFxn, cutoff: number) {
  return (x: number, y: number) => text(x, y) > cutoff;
}

export function negate(text: TextureFxn) {
  return (x: number, y: number) => 1 - text(x, y);
}

export function smoothText(text: TextureFxn, num: number, radius: number): TextureFxn {
  return (x, y) => {
    const nums: number[] = [];
    const localRadius = Math.min(x, 1 - x, y, 1 - y, radius);
    for (var i = 0; i < num; i++) {
      nums.push(text(x + Math.random() * localRadius, y + Math.random() * localRadius));
    }
    return avg(nums);
  }
}

function avg(nums: number[]): number {
  const sum = nums.reduce((x, y) => x + y, 0);
  return sum/nums.length;
}