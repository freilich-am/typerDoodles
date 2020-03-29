export class Color{
  // should be ints between 0 and 255
  r: number;
  g: number;
  b: number;
  constructor(r: number, g: number, b: number, ) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

function inflate(x: number): number {
  if (x < 0 || x > 255) {
    return 0;
  } else {
    return Math.round((1 - ((x/255) * (x/255))) * 255)
  }
}

export function exaggerate(color: Color, depth: number = 0): Color {
  if (depth < 1) {
    return new Color(inflate(color.r), inflate(color.g), inflate(color.b), )
  } else {
    return exaggerate(exaggerate(color), depth - 1);
  }
}