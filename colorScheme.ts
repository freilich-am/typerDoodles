import { Color, exaggerate, invert, HsvColor } from "./color";

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

export function getRandomHslColorScheme() {
  const s = 0;
  const l = 0;
  const c1 = Math.random() * 360;
  return { scheme: [new HsvColor(c1, s, l, ), new HsvColor(c1 + 90, s, l, ), new HsvColor(c1 + 180, s, l, ), new HsvColor(c1 + 270, s, l, )] };
}

export function testColorScheme(cs: ColorScheme): ((x: number, y: number) => Color) {
  return (x, y) => {
    return cs.scheme[Math.floor(((x + y) % 1) * cs.scheme.length)];
  };
}

export function testHSL(x: number, y: number): Color {
  return new HsvColor(y * 360, x, x);
}