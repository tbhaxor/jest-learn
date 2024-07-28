import { Account } from './account';

export class Transaction {
  public readonly id: string;
  public readonly timestamp: Date;

  constructor(public readonly fromAccount: Account, public readonly toAccount: Account, public readonly balance: number) {
    this.id = Math.random().toString(36).substring(2);
    if (fromAccount.id === toAccount.id) {
      throw new Error('Transaction within same account is not allowed');
    }
    this.timestamp = new Date();
  }

  revert(negative = false): Transaction {
    if (negative) {
      return new Transaction(this.fromAccount, this.toAccount, -this.balance);
    }
    return new Transaction(this.toAccount, this.fromAccount, this.balance);
  }
}
