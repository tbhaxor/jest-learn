import { DivideByZeroError } from './exceptions';

export function add(a: number, b: number): number {
  if (typeof a !== 'number' || isNaN(a) || typeof b !== 'number' || isNaN(b)) {
    throw new TypeError('Both arguments must be numbers');
  }

  return a + b;
}

export function subtract(a: number, b: number): number {
  return add(a, -b);
}

export function multiply(a: number, b: number): number {
  if (typeof a !== 'number' || isNaN(a) || typeof b !== 'number' || isNaN(b)) {
    throw new TypeError('Both arguments must be numbers');
  }

  return a * b;
}

export function divide(a: number, b: number): number {
  if (typeof a !== 'number' || isNaN(a) || typeof b !== 'number' || isNaN(b)) {
    throw new TypeError('Both arguments must be numbers');
  }

  if (b === 0) {
    throw new DivideByZeroError();
  }

  return a / b;
}
