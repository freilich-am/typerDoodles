import { smoothDraw } from "../jpgUtilities/writeJpg";
import { ColorFxn, outline, } from "../colorTypes/colorFxn";
import { griddy } from "../textures/lib/griddy";
import { getRandomHslColorScheme } from "../colorTypes/colorScheme";
import { HslColor, Color } from "../colorTypes/color";

const scheme0 = getRandomHslColorScheme(3, .2, .8);
const scheme = scheme0.concat(scheme0).concat(scheme0);
const black = new Color(0, 0, 0);

function myWork(r: number): ColorFxn {
  const g2 = griddy(r);
  return (x: number, y: number) => {
    const res = g2(x, y);
    if (res < 0 || res > 1) {
      console.log('yikes')
      return black
    } else {
      const num = Math.floor(16 * res)
      if (num % 2 !== 0) {
        return scheme[0];
      }
      return scheme[1 + (num / 2)];
    }
  };
}

console.log('v1');

const res = parseInt(process.argv[3]) || 400;
smoothDraw(outline(myWork(60), .00003, black), process.argv[2] || 'griddyDoodle.jpg', res, res, 10);