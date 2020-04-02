export class Color{
  // should be ints between 0 and 255
  r: number;
  g: number;
  b: number;
  constructor(r: number, g: number, b: number, ) {
    this.r = Math.floor(r);
    this.g = Math.floor(g);
    this.b = Math.floor(b);
  }
}

export class HslColor extends Color {
  h: number;
  s: number;
  l: number;
  constructor(h: number, s: number, l: number, ) {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const mod = (h % 360) / 60;
    const x = c * (1 - Math.abs(mod % 2 - 1))
<<<<<<< HEAD
=======
    // console.log(`h: ${h}, s: ${s}, l: ${l},`)
    // console.log(`c: ${c}, mod: ${mod}, x: ${x}, mod': ${Math.ceil(mod)}, m: ${l - (c/2)}`)
>>>>>>> 0a60e5eec44e7310b81a93ba66bc041cce8a8604
    let r;
    let g;
    let b;
    switch (Math.ceil(mod)) {
      case 1: r = c; g = x; b = 0; break; 
      case 2: r = x; g = c; b = 0; break; 
      case 3: r = 0; g = c; b = x; break; 
      case 4: r = 0; g = x; b = c; break; 
      case 5: r = x; g = 0; b = c; break; 
      case 6: r = c; g = 0; b = x; break; 
      default: r = 0; g = 0; b = 0;
    }
    let m = l - (c/2);
<<<<<<< HEAD
=======
    // console.log(`r, g, b ${r}, ${g}, ${b}`)
    // console.log(`r, g, b ${r + m}, ${g + m}, ${b + m}`)
>>>>>>> 0a60e5eec44e7310b81a93ba66bc041cce8a8604
    super(((r + m) * 256) % 256, ((g + m) * 256) % 256, ((b + m) * 256) % 256);
    this.h = h;
    this.s = s;
    this.l = l;
  }
}

export function invertR(c: Color): Color {
  return new Color(255 - c.r, c.g, c.b);
}
export function invertG(c: Color): Color {
  return new Color(c.r, 255 - c.g, c.b);
}
export function invertB(c: Color): Color {
  return new Color(c.r, c.g, 255 - c.b);
}
export function invert(c: Color): Color {
  return new Color(255 - c.r, 255 - c.g, 255 - c.b);
}

function inflate(x: number): number {
  if (x < 0 || x > 255) {
    return 0;
  } else {
    return Math.round((1 - ((x/255) * (x/255))) * 255)
  }
}

export function rgbAverage(arr: Color[]): Color {
  let rsum = 0;
  let gsum = 0;
  let bsum = 0;
  arr.forEach(color => {
    rsum += color.r;
    gsum += color.g;
    bsum += color.b;
  })
  return new Color(rsum/arr.length, gsum/arr.length, bsum/arr.length);
}

export function exaggerate(color: Color, depth: number = 0): Color {
  if (depth < 1) {
    return new Color(inflate(color.r), inflate(color.g), inflate(color.b), )
  } else {
    return exaggerate(exaggerate(color), depth - 1);
  }
}