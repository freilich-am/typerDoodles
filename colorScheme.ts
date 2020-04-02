import { Color, exaggerate, invert, HslColor } from "./color";
import { ColorFxn } from "./colorFxn";

// const randomBit = () => Math.random() >= 0.5;
const random255 = () => Math.floor(Math.random() * 255);

export type ColorScheme = Color[];

export function getRandomColor(): Color {
  return new Color(random255(), random255(), random255());
}

export function getRandomColor(): Color {
  return new Color(random255(), random255(), random255());
}

export function getRandomColorScheme() {
  const rand1 = getRandomColor();
  const rand2 = getRandomColor();
  return [rand1, invert(rand1), rand2, invert(rand2)];
}

export function getRandomHslColorScheme(num: number, s: number, l: number) {
  const c1 = Math.random() * 360;
  const c2 = Math.random() * Math.min(90, c1 / 4);
  // const num = 3;
  console.log('num', c1, c2);
  const res = [] as Color[];
  res.push(new HslColor(c1 + c2, s, l));
  res.push(new HslColor(c1, s, l));
  res.push(new HslColor(c1 - c2, s, l));
  res.push(new HslColor(-c1 + c2 + 360, s, l));
  res.push(new HslColor(-c1 + 360, s, l));
  res.push(new HslColor(-c1 - c2 + 360, s, l));
  return res;
}

export function testColorScheme(cs: ColorScheme): ColorFxn {
  // console.log(cs.length, 'len');
  return (x, y) => {
    return cs[Math.floor(x * cs.length)];
  };
}

export const testHSL: ColorFxn = (x, y) => {
  return new HslColor((3 * x + 2 * y) * 360, .1 + .8 * x, .1 + .8 * y);
}