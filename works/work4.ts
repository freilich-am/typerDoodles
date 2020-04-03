import { smoothDraw } from "../jpgUtilities/writeJpg";
import { griddy } from "../textures/lib/griddy";
import { getRegion } from "../textures/types/textureFxn";
import { getRandomHslColorScheme } from "../colorTypes/colorScheme";
import { ColorFxn } from "../colorTypes/colorFxn";
import { HslColor } from "../colorTypes/color";
import { composeThen, griddyCon } from "../convolutions/types/convolution";

// const griddy1 = getRegion(griddy(10), .5);
const griddy2 = griddy(30);
const griddy3 = griddy(100);
const colorScheme = getRandomHslColorScheme(4, .82, .5);
const black = new HslColor(0, 0, 0);

const myWork: ColorFxn = (x: number, y: number) => {
  if (getRegion(griddy2, .5)(x, y)) {
  //   return colorScheme[1];
  // } else if (getRegion(griddy3, .5)(x, y)) {
    return colorScheme[2];
  // } else if (getRegion(griddy3, .48)(x, y)) {
  //   return black;
  } else {
    return colorScheme[3];
  }
};

smoothDraw(myWork, 'griddyDoodle.jpg', 1200, 1200, 10);