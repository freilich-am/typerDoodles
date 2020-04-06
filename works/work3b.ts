import { smoothDraw } from "../jpgUtilities/writeJpg";
import { ColorFxn, outline, } from "../colorTypes/colorFxn";
import { griddy } from "../textures/lib/griddy";
import { getRandomHslColorScheme } from "../colorTypes/colorScheme";
import { HslColor, Color } from "../colorTypes/color";
import { smoothText } from "../textures/types/textureFxn";

const scheme = getRandomHslColorScheme(3, .2, .7);
const black = new HslColor(0, 0, 0);

function myWork(r: number): ColorFxn {
  const g2 = griddy(r);
  // const g1 = smoothText(griddy(2 * r), 8, .05);
  return (x: number, y: number) => {
    const res = g2(x, y);
    if (res < 0 || res > 1) {
      return black
    } else {
      if (res < .3) {
        return scheme[1]; // as HslColor;
        // return new HslColor(c.h, c.s, c.l + 0.15 * g1(x, y));
      } else if (res < .7) {
        return scheme[0]; // as HslColor;
        // return new HslColor(c.h, c.s, c.l + 0.15 * g1(x, y));
      } else {
        return scheme[2]; // as HslColor;
        // return new HslColor(c.h, c.s, c.l + 0.15 * g1(x, y));
      }
    }
  };
}

const outlinedWork = outline(myWork(60), .001, black);
function texturize(cf: ColorFxn) {
  const g0 = griddy(120);
  return (x: number, y: number) => {
    const col = cf(x, y) as HslColor;
    if (col.l > .2 && col.l < .79) {
      return new HslColor(col.h, col.s, col.l + .2 * g0(x, y));
    } else {
      return col;
    }
  }
}

console.log('v2');

const res = parseInt(process.argv[3]) || 4000;
smoothDraw(texturize(outlinedWork), process.argv[2] || 'griddyDoodle.jpg', res, res, 10);