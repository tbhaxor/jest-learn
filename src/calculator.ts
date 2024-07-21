import { DivideByZeroError } from './exceptions';

export class Calculator {
  static add(a: number, b: number): number {
    if (typeof a !== 'number' || isNaN(a) || typeof b !== 'number' || isNaN(b)) {
      throw new TypeError('Both arguments must be numbers');
    }

    return a + b;
  }

  static subtract(a: number, b: number): number {
    return Calculator.add(a, -b);
  }

  static multiply(a: number, b: number): number {
    if (typeof a !== 'number' || isNaN(a) || typeof b !== 'number' || isNaN(b)) {
      throw new TypeError('Both arguments must be numbers');
    }

    return a * b;
  }

  static divide(a: number, b: number): number {
    if (typeof a !== 'number' || isNaN(a) || typeof b !== 'number' || isNaN(b)) {
      throw new TypeError('Both arguments must be numbers');
    }

    if (b === 0) {
      throw new DivideByZeroError();
    }

    return a / b;
  }
}
