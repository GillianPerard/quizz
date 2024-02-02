import { toNumber } from './number';

describe('number util', () => {
  describe('toNumber', () => {
    const values: Array<[unknown, number]> = [
      [undefined, 0],
      [null, 0],
      ['test', 0],
      [true, 1],
      [false, 0],
      [{}, 0],
      [[], 0],
      [4, 4],
    ];

    values.forEach(([value, result]) => {
      it(`should return ${result} for ${JSON.stringify(value)}`, () => {
        expect(toNumber(value)).toEqual(result);
      });
    });
  });
});
