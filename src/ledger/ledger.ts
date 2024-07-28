import { Account } from './account';
import { Transaction } from './transaction';

export class Ledger {
  public readonly transactions: Transaction[] = [];

  transfer(fromAccount: Account, toAccount: Account, amount: number): Transaction {
    if (fromAccount.balance < amount) {
      throw new Error('Insufficient balance');
    }

    const transaction = new Transaction(fromAccount, toAccount, amount);

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    this.transactions.push(transaction);
    return transaction;
  }

  revert(id: string, negative: boolean): Transaction {
    const txn = this.transactions.find((v) => v.id === id);
    if (!txn) {
      throw new Error('Transaction not found');
    }
    const revTransaction = txn.revert(negative);
    this.transactions.push(revTransaction);
    return revTransaction;
  }
}
