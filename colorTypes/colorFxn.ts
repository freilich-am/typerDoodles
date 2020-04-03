import { Color, rgbAverage, HslColor, colorDist } from "./color";
import { PlaneMap } from "../planeMap/planeMap";

export type ColorFxn = PlaneMap<Color>;

export function smoothen(cf: ColorFxn, width: number, height: number, factor: number = 8): ColorFxn {
  return (x, y) => {
    const colorArray: Color[] = [];
    for (var i = 0; i < factor; i++) {
      colorArray.push(cf(x + Math.random() / width, y + Math.random() / height));
    }
    return rgbAverage(colorArray);
  }
}

const black = new HslColor(0, 0, 0);
const white = new Color(255, 255, 255);
const grey = new Color(128, 128, 128);

export function outline(cf: ColorFxn, r: number = .002, def: Color = black): ColorFxn {
  return (x: number, y: number) => {
    let dist = 0;
    const currCol = cf(x, y);
    const distToBound = Math.min(x, y, 1 - x, 1 - y);
    const num = 30;
    for (var i = 0; i < num; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const x1 = x + Math.cos(angle) * Math.min(distToBound, r);
      const y1 = y + Math.sin(angle) * Math.min(distToBound, r);
      dist += colorDist(currCol, cf(x1, y1));
    }
    dist = dist / num;
    return ((dist / 6) > .001) ? def : currCol;
  }
}

export const grid: ColorFxn = (x: number, y: number) => {
  if ((Math.floor(x * 10) + Math.floor(y * 10)) % 2 === 0) {
    return grey;
  } else {
    return white;
  }
}