export interface TileArrangement{
  UL?: TileArrangement;
  UR?: TileArrangement;
  LL?: TileArrangement;
  LR?: TileArrangement;
  Tile?: Tile;
}

export interface Tile {
  isDiagonalRight: boolean;
  isLeftFilledIn: boolean;
}

const randomBit = () => Math.random() >= 0.5;

export function generateRandomTile(): Tile {
  return {
    isDiagonalRight: randomBit(),
    isLeftFilledIn: randomBit()
  } ;
}

// i think p should be < .25 so that this terminates whp.
export function generateRandomArrangement(p: number, level: number): TileArrangement {
  p = p > 0 && p < 1 ? p : 1;
  const rand = Math.random();
  if (level > 4) {
    return { Tile: generateRandomTile() };
  } else {
    // console.log('yeah!')
    return {
      UL: generateRandomArrangement(Math.min(p, 1/level), level + 1),
      UR: generateRandomArrangement(Math.min(p, 1/level), level + 1),
      LL: generateRandomArrangement(Math.min(p, 1/level), level + 1),
      LR: generateRandomArrangement(Math.min(p, 1/level), level + 1),
    };
  }
}

// export interface Color{
//   // ??
// }

// x, y should be in [0, 1], where (0, 0) marks the upper right
export function getColorFromTileArrangment(argmt: TileArrangement | undefined, x: number, y: number): number {
  if (!argmt) {
    console.log('yikes');
    return 0;
  } else if (argmt.Tile) {
    if (argmt.Tile.isDiagonalRight) {
      // there must be a better way
      return (!!(x > y) !== argmt.Tile.isLeftFilledIn) ? 1 : 0; // replace with colors
    } else {
      return (!!(x > (1 - y)) !== argmt.Tile.isLeftFilledIn) ? 1 : 0; // replace with colors
    }
  } else {
    switch (2 * +(x > .5) + +(y > .5)) {
      case 0: return getColorFromTileArrangment(argmt.UL, 2 * (x % .5), 2 * (y % .5));
      case 1: return getColorFromTileArrangment(argmt.UR, 2 * (x % .5), 2 * (y % .5));
      case 2: return getColorFromTileArrangment(argmt.LL, 2 * (x % .5), 2 * (y % .5));
      case 3: return getColorFromTileArrangment(argmt.LR, 2 * (x % .5), 2 * (y % .5));
      default: console.log('yiyi'); return 0;
    }
  }
}

export function getRandomColorFunction(): ((x: number, y: number) => number) {
  const argmt = generateRandomArrangement(0, 1);
  // console.log(JSON.stringify(argmt, null, 2));
  return (x, y) => getColorFromTileArrangment(argmt, x + 0.0001 * Math.random(), y + 0.0001 * Math.random());
}