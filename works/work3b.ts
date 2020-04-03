import { smoothDraw } from "../jpgUtilities/writeJpg";
import { ColorFxn, } from "../colorTypes/colorFxn";
import { griddy } from "../textures/lib/griddy";
import { getRandomHslColorScheme } from "../colorTypes/colorScheme";


function myWork(r: number): ColorFxn {
  const g2 = griddy(r);
  const scheme = getRandomHslColorScheme(3, .8, .7);
  return (x: number, y: number) => scheme[Math.floor(3 * g2(x, y))];
}

console.log('v0');

const res = parseInt(process.argv[3]) || 400;
smoothDraw(myWork(20), process.argv[2] || 'griddyDoodle.jpg', res, res, 10);