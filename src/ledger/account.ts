export class Account {
  public readonly id: string;
  private _balance: number;
  constructor(public readonly name: string, initialBalance: number) {
    this.id = Math.random().toString(36).substring(2);
    this._balance = Math.max(0, initialBalance);
  }

  get balance(): number {
    return this._balance;
  }

  set balance(value: number) {
    this._balance = value;
  }
}
