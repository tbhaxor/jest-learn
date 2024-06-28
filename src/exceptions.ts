export class DivideByZeroError extends Error {
  constructor() {
    super('Division by zero error');
    this.name = 'DivideByZeroError';
  }
}
