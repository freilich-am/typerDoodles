import { Color, rgbAverage } from "./color";

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