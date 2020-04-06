import { smoothDraw } from "../jpgUtilities/writeJpg";
import { ColorFxn, outline, } from "../colorTypes/colorFxn";
import { griddy } from "../textures/lib/griddy";
import { getRandomHslColorScheme } from "../colorTypes/colorScheme";
import { HslColor, Color } from "../colorTypes/color";

const scheme = getRandomHslColorScheme(3, .2, .8);
const black = new Color(0, 0, 0);

function myWork(r: number): ColorFxn {
  const g2 = griddy(r);
  return (x: number, y: number) => {
    const res = g2(x, y);
    if (res < 0 || res > 1) {
      return black
    } else {
      if (res < .3) {
        return scheme[1];
      } else if (res < .7) {
        return scheme[0];
      } else {
        return scheme[2];
      }
    }
  };
}

console.log('v1');

const res = parseInt(process.argv[3]) || 400;
smoothDraw(outline(myWork(100), .0003, black), process.argv[2] || 'griddyDoodle.jpg', res, res, 10);