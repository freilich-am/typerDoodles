import { smoothDraw } from "../jpgUtilities/writeJpg";
import { grid, outline } from "../colorTypes/colorFxn";
import { griddyCon, composeThen } from "../convolutions/types/convolution";

smoothDraw(outline(composeThen(griddyCon(), grid)), 'outlineTest.jpg', 1200, 1200, 10);