import { testHSL } from "../colorTypes/colorScheme";
import { smoothDraw } from "../jpgUtilities/writeJpg";

smoothDraw(testHSL, 'work2.jpg', 500, 500);