import { TextureFxn } from "../types/textureFxn";

export function generateOffsetsGrid(r: number): number[][]{
  const offSets = [] as number[][];
  const distFromMid = (x: number, y: number) => {
    return Math.sqrt((.5 - x) * (.5 - x) + (.5 - y) * (.5 - y));
  }
  for (var i = 0; i <= r; i++) {
    offSets.push([]);
    for (var j = 0; j <= r; j++) {
      if (i > 0 && j > 0 && (Math.random() < 1 - 2 * distFromMid(i/r, j/r))) {
        offSets[i].push(offSets[i-1][j-1]);
        offSets[i-1][j] = offSets[i][j-1] = offSets[i][j];
      } else {
        offSets[i].push(Math.random());
      }
    }
  }
  return offSets;
}

export function griddy(r0: number): TextureFxn {
  const offSets = generateOffsetsGrid(r0);
  return (x0: number, y0: number) => {
    const x = x0 // x0 < .5 ? x0 * x0 : (1-x0) * (1-x0);
    const y = y0 // y0 * y0;
    const r = r0 - 1;// x < y ? 2 * r0 : r0
    const i = Math.floor(x * r);
    const j = Math.floor(y * r);
    const diffx = x * r - i;
    const diffy = y * r - j;
    const v1 = offSets[i][j];
    const v2 = offSets[i + 1][j];
    const v3 = offSets[i][j + 1];
    const v4 = offSets[i + 1][j + 1];
    const w1 = (1 - diffx) * v1 + (diffx) * v2;
    const w2 = (1 - diffx) * v3 + (diffx) * v4;
    const res = (1 - diffy) * w1 + (diffy) * w2;
    return res;
  }
}

export function griddy2(r0: number): TextureFxn {
  const offSets = generateOffsetsGrid(r0);
  return (x0: number, y0: number) => {
    const x = x0 // x0 < .5 ? x0 * x0 : (1-x0) * (1-x0);
    const y = y0 // y0 * y0;
    const r = r0;// x < y ? 2 * r0 : r0
    const i = Math.floor(x * r);
    const j = Math.floor(y * r);
    const diffx = x * r - i;
    const diffy = y * r - j;
    const v1 = offSets[i][j];
    const v2 = offSets[i + 1][j];
    const v3 = offSets[i][j + 1];
    const v4 = offSets[i + 1][j + 1];
    const d1 = 1 / Math.sqrt(diffx * diffx + diffy * diffy);
    const d2 = 1 / Math.sqrt((1 - diffx) * (1 - diffx) + diffy * diffy);
    const d3 = 1 / Math.sqrt(diffx * diffx + (1 - diffy) * (1 - diffy));
    const d4 = 1 / Math.sqrt((1 - diffx) * (1 - diffx) + (1 - diffy) * (1 - diffy));
    const res = (d1 * v1 + d2 * v2 + d3 * v3 + d4 * v4)/(d1 + d2 + d3 + d4) || v1;
    return res;
  }
}