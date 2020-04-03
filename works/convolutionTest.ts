import { smoothDraw } from "../jpgUtilities/writeJpg";
import { griddyCon, test } from "../convolutions/types/convolution";

smoothDraw(test(griddyCon(10, .001)), 'griddyDoodle.jpg', 1200, 1200, 10);