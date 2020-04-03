import { smoothDraw } from "../jpgUtilities/writeJpg";
import { grid, outline } from "../colorTypes/colorFxn";

smoothDraw(outline(grid), 'outlineTest.jpg', 1200, 1200, 10);