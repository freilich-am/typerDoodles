import { Color, exaggerate } from "./color";

// const randomBit = () => Math.random() >= 0.5;
const random255 = () => Math.floor(Math.random() * 255);

export interface ColorScheme {
  scheme: Color[]
};

export function getRandomColorScheme() {
  // if (randomBit()) {
    const r = random255();
    const b = random255();
    const g = random255();
    console.log(`r ${r}, b ${b}, g ${g}`)
    return { scheme: [
      (new Color(r, g, b)),
      (new Color(255 - r, g, 255 - b)), 
      (new Color(r, 255 - g, 255 - b)), 
      (new Color(255 - r, 255 - g, b)), 
    ] }
  // } else {

  // }
}

export function testColorScheme(cs: ColorScheme): ((x: number, y: number) => Color) {
  return (x, y) => (y > .5) 
    ? cs.scheme[Math.floor(x * cs.scheme.length)]
    : exaggerate(cs.scheme[Math.floor(x * cs.scheme.length)], Math.floor(y * 4));
}