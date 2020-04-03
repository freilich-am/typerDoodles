import Jimp from 'jimp'
import { ColorFxn, smoothen } from '../colorTypes/colorFxn';

export function writeJpg(colorFxn: ColorFxn, filename: string, width: number, height: number) {
  let img = new Jimp(width, height, (err, image) => {} );

  img.scan(0, 0, img.bitmap.width, img.bitmap.height, function(x, y, idx) {
      const color = colorFxn(x/width, y/height);
      this.bitmap.data[idx + 0] = color.r;
      this.bitmap.data[idx + 1] = color.g;
      this.bitmap.data[idx + 2] = color.b;
      this.bitmap.data[idx + 3] = 255;
  });
  
  img.write('img/' + filename);
}

export function smoothDraw(colorFxn: ColorFxn, filename: string, width: number, height: number, factor?: number) {
  writeJpg(smoothen(colorFxn, width, height, factor), filename, width, height);
}
