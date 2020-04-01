import { Color, exaggerate, invert, HslColor } from "./color";

// const randomBit = () => Math.random() >= 0.5;
const random255 = () => Math.floor(Math.random() * 255);

export interface ColorScheme {
  scheme: Color[]
};

export function getRandomColor(): Color {
  return new Color(random255(), random255(), random255());
}

export function getRandomColorScheme() {
  const rand1 = getRandomColor();
  const rand2 = getRandomColor();
  return { scheme: [rand1, invert(rand1), rand2, invert(rand2)] };
}

export function getRandomHslColorScheme(num: number, s: number, l: number) {
  const c1 = Math.random() * 360;
  const c2 = Math.random() * Math.min(90, c1 / 4);
  // const num = 3;
  console.log('num', c1, c2);
  const res = {scheme: [] as Color[]};
  res.scheme.push(new HslColor(c1 + c2, s, l));
  res.scheme.push(new HslColor(c1 - c2, s, l));
  res.scheme.push(new HslColor(-c1 + c2 + 360, s, l));
  res.scheme.push(new HslColor(-c1 - c2 + 360, s, l));
  return res;
}

export function testColorScheme(cs: ColorScheme): ((x: number, y: number) => Color) {
  // console.log(cs.scheme.length, 'len');
  return (x, y) => {
    return cs.scheme[Math.floor(x * cs.scheme.length)];
  };
}

export function testHSL(x: number, y: number): Color {
  return new HslColor((3 * x + 2 * y) * 360, .1 + .8 * x, .1 + .8 * y);
}