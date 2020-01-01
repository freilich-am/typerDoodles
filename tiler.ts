export interfacte TileArrangement = FullTileArrangement | Tile;

export interface FullTileArrangement{
  0: TileArrangement;
  1: TileArrangement;
  2: TileArrangement;
  3: TileArrangement;
}

export interface Tile {
  isDiagonalRight: boolean;
  isLeftFilledIn: boolean;
}

// i think p should be < .25 so that this terminates whp.
export function generateRandomArrangement(p: number) {
  p = Math.min(1, Math.max(0, p));
  const rand = Math.random();
  if (rand < p) {
    return { isDiagonalRight: randomBit(); isLeftFilledIn: randomBit() } as Tile;
  } else {
    return {
      0: generateRandomArrangement(p),
      1: generateRandomArrangement(p),
      2: generateRandomArrangement(p),
      3: generateRandomArrangement(p),
    } as FullTileArrangement;
  }
}

export interface Color{
  // ??
}

// x, y should be in [0, 1], where (0, 0) marks the upper right
export function getColorFromTileArrangment(argmt: TileArrangement, x: number, y: number) {
  if (argmt implements Tile) {
    if (argmt.isDiagonalRight) {
      // there must be a better way
      return ((!!(x > y) + argmt.isLeftFilledIn) % 2) ? Color.White : Color.Black;
    } else {
      return ((!!(x > (1 - y)) + argmt.isLeftFilledIn) % 2) ? Color.White : Color.Black;
    }
  } else {
    switch (2 * (x > .5) + (y > .5)) {
      case 0: return getColorFromTileArrangment(argmt.0, x % .5, y % .5);
      case 1: return getColorFromTileArrangment(argmt.1, x % .5, y % .5);
      case 2: return getColorFromTileArrangment(argmt.2, x % .5, y % .5);
      case 3: return getColorFromTileArrangment(argmt.3, x % .5, y % .5);
    }
  }
}

export function getRandomColorFunction(): ((x: number, y: number) => Color) {
  const argmt = generateRandomArrangement(.2);
  return (x, y) => getColorFromTileArrangment(argmt, x, y);
}