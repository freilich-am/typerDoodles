import Jimp from 'jimp'
import { getRandomColorScheme, testColorScheme, getRandomHslColorScheme, testHSL } from '../colorScheme';

const colorScheme = getRandomHslColorScheme(
    parseInt(process.argv[5]) || 3,
    parseFloat(process.argv[6]) || .5,
    parseFloat(process.argv[7]) || .5);
const colorFxn = testColorScheme(colorScheme);

const width = parseInt(process.argv[3]) || 400;
const height = parseInt(process.argv[4]) || width;

let img = new Jimp(width, height, (err, image) => {} );

img.scan(0, 0, img.bitmap.width, img.bitmap.height, function(x, y, idx) {
    const color = colorFxn(x/width, y/height);
    this.bitmap.data[idx + 0] = color.r;
    this.bitmap.data[idx + 1] = color.g;
    this.bitmap.data[idx + 2] = color.b;
    this.bitmap.data[idx + 3] = 255;
});

img.write(process.argv[2] || 'hsltest.jpg');

// for (let i = 0; i < 150; i++) {
//     let str = '';
//     for (let j = 0; j < 300; j++) {
//         str = str + colorFxn(i/150, j/300);
//     }
//     console.log(`${str}(${i})`);
// }
// print();