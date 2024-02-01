import { formatScore } from './score';

describe('score helper', () => {
  describe('formatScore', () => {
    const values: Array<[number, string]> = [
      [0, '00/10'],
      [4, '04/10'],
      [10, '10/10'],
    ];

    values.forEach(([value, result]) => {
      it(`should return ${result} for ${value}`, () => {
        expect(formatScore(value)).toEqual(result);
      });
    });
  });
});
