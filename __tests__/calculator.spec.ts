import { Calculator } from '../src/calculator';
import { DivideByZeroError } from '../src/exceptions';

describe('Calculator', () => {
  describe('add(number, number)', () => {
    it.each([
      ['a', 1],
      [1, 'b'],
      ['a', 'b'],
    ])('should throw TypeError when `%s` and `%s` are added', (a: any, b: any) => {
      expect(() => Calculator.add(a, b)).toThrow(TypeError);
    });

    it.each([
      [1, 2, 3],
      [-1, 2, 1],
      [1, -2, -1],
      [-1, -2, -3],
    ])('should add `%d` and `%d` to yield `%d`', (a, b, expected) => {
      expect(Calculator.add(a, b)).toBe(expected);
    });
  });

  describe('subtract(number, number)', () => {
    let addMock: jest.SpyInstance;

    beforeEach(() => {
      addMock = jest.spyOn(Calculator, 'add');
    });

    afterEach(() => {
      addMock.mockRestore();
    });

    it.each([
      ['a', 1],
      [1, 'b'],
      ['a', 'b'],
    ])('should throw TypeError when `%s` and `%s` are subtracted', (a: any, b: any) => {
      expect(() => Calculator.subtract(a, b)).toThrow(TypeError);
      expect(addMock).toHaveBeenCalled();
    });

    it.each([
      [5, 3, 2],
      [-1, -1, 0],
      [1.5, 0.5, 1],
    ])('should subtract `%d` and `%d` to yield `%d`', (a, b, expected) => {
      expect(Calculator.subtract(a, b)).toBe(expected);
      expect(Calculator.add).toHaveBeenCalledWith(a, -b);
    });
  });

  describe('multiply(number, number)', () => {
    it.each([
      ['a', 1],
      [1, 'b'],
      ['a', 'b'],
    ])('should throw TypeError when `%s` and `%s` are multiplied', (a: any, b: any) => {
      expect(() => Calculator.multiply(a, b)).toThrow(TypeError);
    });

    it.each([
      [2, 3, 6],
      [-2, 3, -6],
      [1.5, 2, 3],
    ])('should multiply `%d` and `%d` to yied `%d`', (a, b, expected) => {
      expect(Calculator.multiply(a, b)).toBe(expected);
    });
  });

  describe('divide(number, number)', () => {
    it.each([
      [TypeError.name, 'a', 1, TypeError],
      [TypeError.name, 1, 'b', TypeError],
      [TypeError.name, 'a', 'b', TypeError],
      [DivideByZeroError.name, 1, 0, DivideByZeroError],
    ])('should throw %s when `%s` is divided by `%s`', (_exceptionName, a: any, b: any, expected) => {
      expect(() => Calculator.divide(a, b)).toThrow(expected);
    });

    it.each([
      [6, 3, 2],
      [-6, 3, -2],
      [6, -3, -2],
      [-6, -3, 2],
      [1.5, 0.5, 3],
    ])('should divide `%s` by `%s` to yield `%s`', (a: any, b: any, expected) => {
      expect(Calculator.divide(a, b)).toBe(expected);
    });
  });
});
