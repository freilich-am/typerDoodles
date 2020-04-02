import { smoothDraw } from "../writeJpg";
import { HslColor } from "../color";
import { ColorFxn } from "../colorFxn";

function generateOffsetsGrid(r: number): number[][]{
  const offSets = [] as number[][];
  for (var i = 0; i <= r; i++) {
    offSets.push([]);
    for (var j = 0; j <= r; j++) {
      offSets[i].push(Math.random());
    }
  }
  return offSets;
}

function myWork(r0: number): ColorFxn {
  const offSets = generateOffsetsGrid(2 * r0);
  const color = Math.random() * (360 / 3);
  return (x0: number, y0: number) => {
    const x = x0 // x0 < .5 ? x0 * x0 : (1-x0) * (1-x0);
    const y = y0 // y0 * y0;
    const r = 2 * r0;// x < y ? 2 * r0 : r0
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
    return new HslColor(color + (Math.floor(res * 3) * (360 / 3)), .4 + .4 * res, .75);
  }
}

smoothDraw(myWork(20), 'griddyDoodle.jpg', 1000, 1000, 10);