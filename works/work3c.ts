import { smoothDraw } from "../jpgUtilities/writeJpg";
import { ColorFxn, outline, } from "../colorTypes/colorFxn";
import { griddy } from "../textures/lib/griddy";
import { getRandomHslColorScheme } from "../colorTypes/colorScheme";


function myWork(r: number): ColorFxn {
  const g2 = griddy(r);
  const scheme = getRandomHslColorScheme(3, .95, .87);
  return (x: number, y: number) => scheme[Math.floor(3 * g2(x, y))];
}

console.log('3c, v1');

const res = parseInt(process.argv[3]) || 1000;
smoothDraw(outline(myWork(23)), process.argv[2] || 'griddyDoodle.jpg', res, res, 15);