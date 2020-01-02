// import { print } from './wtvr';
import { getRandomColorFunction } from './tiler';

const colorFxn = getRandomColorFunction();
for (let i = 0; i < 64; i++) {
    let str = '';
    for (let j = 0; j < 64; j++) {
        str = str + colorFxn(i/64, j/64);
    }
    console.log(str);
}
// print();