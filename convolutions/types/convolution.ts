import { griddy } from "../../textures/lib/griddy";
import { ColorFxn, grid } from "../../colorTypes/colorFxn";

// export type ConvolutionFxn = (x: number, y: number) => {x: number, y: number};

export type PlaneMap<T> = (x: number, y: number) => T;

export type ConvolutionFxn = PlaneMap<{x: number, y: number}>; 

export const IdConvolution = (x: number, y: number) => { return {x, y} };

export function composeThen<T> (c: ConvolutionFxn, m: PlaneMap<T>): PlaneMap<T> {
  return (x: number, y: number) => {
    const mappedPt = c(x, y);
    return m(mappedPt.x, mappedPt.y);
  }
}

export function test(c: ConvolutionFxn): ColorFxn {
  return composeThen(c, grid);
}

export function composeAll(cs: ConvolutionFxn[]): ConvolutionFxn {
  return cs.reduce(composeThen, IdConvolution);
}

export function griddyCon(gridNum: number = 10, weighting: number = .1): ConvolutionFxn {
  const xOffsets = griddy(gridNum);
  const yOffsets = griddy(gridNum);
  return (x0: number, y0: number) => {
    return {
      x: x0 + weighting * xOffsets(x0, y0) * Math.cos(x0 * Math.PI),
      y: y0 + weighting * yOffsets(x0, y0) * Math.cos(y0 * Math.PI)
    };
  }

}