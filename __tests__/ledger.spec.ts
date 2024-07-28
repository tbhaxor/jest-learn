import { Account } from '../src/ledger/account';
import { faker } from '@faker-js/faker';
import { Transaction } from '../src/ledger/transaction';
import { workerData } from 'worker_threads';
import { Ledger } from '../src/ledger/ledger';
import { transcode } from 'buffer';

describe('Account', () => {
  it('should set balance to 0 if initialBalance is -ve', () => {
    const name = faker.person.fullName();
    const balance = faker.number.int({ max: -1, min: Number.MIN_SAFE_INTEGER });

    const account = new Account(name, balance);
    expect(account.name).toBe(name);
    expect(account.balance).toBe(0);
  });

  it('should setup account with random id', () => {
    const name = faker.person.fullName();
    const balance = faker.number.int();

    const account = new Account(name, balance);

    expect(account.balance).toBe(balance);
    expect(account.name).toBe(name);
    expect(typeof account.id).toBe('string');
  });

  it('should set balance value', () => {
    const name = faker.person.fullName();
    const balance = faker.number.int();

    const account = new Account(name, balance);

    account.balance = 10;
    expect(account.balance).toBe(10);

    account.balance += 10;
    expect(account.balance).toBe(20);
  });
});

describe('Transaction', () => {
  let firstAccount: Account;
  let secondAccount: Account;

  beforeEach(() => {
    firstAccount = new Account(faker.person.fullName(), faker.number.int({ min: 100, max: 1000 }));
    secondAccount = new Account(faker.person.fullName(), faker.number.int({ min: 100, max: 1000 }));
  });

  it('should throw error when from account and to account are same', () => {
    expect(() => new Transaction(firstAccount, firstAccount, 100)).toThrow(Error);
  });

  it('should initialize the object with random id and current timestamp', () => {
    const bal = faker.number.int({ min: 100, max: 1000 });
    const fakeRandom = faker.number.float();
    const fakeTransactionDate = faker.date.anytime();
    // Using it here because I want immediate effects
    jest.spyOn(global.Math, 'random').mockReturnValue(fakeRandom);
    jest.useFakeTimers().setSystemTime(fakeTransactionDate);

    const txn = new Transaction(firstAccount, secondAccount, bal);
    jest.spyOn(global.Math, 'random').mockRestore();
    jest.clearAllTimers();

    expect(txn.id).toBe(fakeRandom.toString(36).substring(2));
    expect(txn.timestamp).toStrictEqual(fakeTransactionDate);
    expect(txn.balance).toBe(bal);
    expect(txn.fromAccount).toBe(firstAccount);
    expect(txn.toAccount).toBe(secondAccount);
  });

  describe('Transaction::revert', () => {
    let transaction: Transaction;
    beforeEach(() => {
      transaction = new Transaction(firstAccount, secondAccount, faker.number.int({ min: 100, max: 1000 }));
    });

    it('should return instance of Transaction', () => {
      expect(transaction.revert()).toBeInstanceOf(Transaction);
    });

    it('should swap to and from accounts when negative parameter is false', () => {
      const revTransaction = transaction.revert();

      expect(revTransaction.fromAccount).toBe(transaction.toAccount);
      expect(revTransaction.toAccount).toBe(transaction.fromAccount);
      expect(revTransaction.balance).toBe(transaction.balance);
    });

    it('should not swap the account, but instead add -ve sign to balance when negative parameter is true', () => {
      const revTransaction = transaction.revert(true);

      expect(revTransaction.fromAccount).toBe(transaction.fromAccount);
      expect(revTransaction.toAccount).toBe(transaction.toAccount);
      expect(revTransaction.balance).toBe(-transaction.balance);
    });
  });
});

describe('Ledger', () => {
  let ledger: Ledger;
  let firstAccount: Account;
  let secondAccount: Account;

  beforeAll(() => {
    ledger = new Ledger();
  });

  beforeEach(() => {
    firstAccount = new Account(faker.person.fullName(), faker.number.int({ min: 100, max: 1000 }));
    secondAccount = new Account(faker.person.fullName(), faker.number.int({ min: 100, max: 1000 }));
  });

  it('should starts with empty ledger', () => {
    expect(ledger.transactions).toHaveLength(0);
  });

  describe('Ledger::transfer', () => {
    it('should throw error if amount is greater than from account balance', () => {
      expect(() => ledger.transfer(firstAccount, secondAccount, firstAccount.balance + 1)).toThrow(Error);
    });

    it('should deduct amount from the fromAccount and add to the toAccount and create transaction', () => {
      const amount = faker.number.int({ min: 100, max: firstAccount.balance });
      const oldFirstAccountBalance = firstAccount.balance;
      const oldSecondAccountBalance = secondAccount.balance;
      const txn = ledger.transfer(firstAccount, secondAccount, amount);

      expect(firstAccount.balance + amount).toBe(oldFirstAccountBalance);
      expect(secondAccount.balance - amount).toBe(oldSecondAccountBalance);
      expect(ledger.transactions).toHaveLength(1);
      expect(ledger.transactions[0]).toBe(txn);
      expect(txn.fromAccount).toBe(firstAccount);
      expect(txn.toAccount).toBe(secondAccount);
      expect(txn.balance).toBe(amount);
    });
  });

  describe('Ledger::revert', () => {
    it('should throw error when transaction not found', () => {
      expect(() => ledger.revert(faker.lorem.slug(), Boolean(faker.number.int({ min: 0, max: 1 })))).toThrow(Error);
    });

    it('should add the reverted transaction to the ledger', () => {
      const txn = ledger.revert(ledger.transactions[0].id, false);

      expect(ledger.transactions).toHaveLength(2);
      expect(ledger.transactions[1]).toBe(txn);
    });
  });
});
