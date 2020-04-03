import { Color, rgbAverage, HslColor } from "./color";

export type ColorFxn = (x: number, y: number) => Color;

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
const white = new HslColor(.5, .5, .5);

export const grid: ColorFxn = (x: number, y: number) => {
  if ((Math.floor(x * 10) + Math.floor(y * 10)) % 2 === 0) {
    return black;
  } else {
    return white;
  }
}