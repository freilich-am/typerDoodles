// import { print } from './wtvr';
import Jimp from 'jimp'
import { getRandomColorFunction } from './tiler';

const colorFxn0 = getRandomColorFunction();
const colorFxn1 = getRandomColorFunction();
const colorFxn2 = getRandomColorFunction();
// const colorFxn3 = getRandomColorFunction();

let img = new Jimp(500, 500, (err, image) => {} );

img.scan(0, 0, img.bitmap.width, img.bitmap.height, function(x, y, idx) {
    // x, y is the position of this pixel on the image
    // idx is the position start position of this rgba tuple in the bitmap Buffer
    // this is the image
   
    // var red = this.bitmap.data[idx + 0];
    // var green = this.bitmap.data[idx + 1];
    // var blue = this.bitmap.data[idx + 2];
    // var alpha = this.bitmap.data[idx + 3];
    this.bitmap.data[idx + 0] = Math.round(255 *
        (0.25 * colorFxn0(x/img.bitmap.width, y/img.bitmap.height) +
        0.7 * colorFxn1(x/img.bitmap.width, y/img.bitmap.height) +
        0.05 * colorFxn2(x/img.bitmap.width, y/img.bitmap.height)));
    this.bitmap.data[idx + 1] = Math.round(255 *
        (0.1 * colorFxn0(x/img.bitmap.width, y/img.bitmap.height) +
        0.2 * colorFxn1(x/img.bitmap.width, y/img.bitmap.height) +
        0.7 * colorFxn2(x/img.bitmap.width, y/img.bitmap.height)));
    this.bitmap.data[idx + 2] = Math.round(255 *
        (0.3 * colorFxn0(x/img.bitmap.width, y/img.bitmap.height) +
        0.4 * colorFxn1(x/img.bitmap.width, y/img.bitmap.height) +
        0.5 * colorFxn2(x/img.bitmap.width, y/img.bitmap.height)));
    this.bitmap.data[idx + 3] = 255;
   
    // rgba values run from 0 - 255
    // e.g. this.bitmap.data[idx] = 0; // removes red from this pixel
  });

img.write('sup.jpg')

// for (let i = 0; i < 150; i++) {
//     let str = '';
//     for (let j = 0; j < 300; j++) {
//         str = str + colorFxn(i/150, j/300);
//     }
//     console.log(`${str}(${i})`);
// }
// print();