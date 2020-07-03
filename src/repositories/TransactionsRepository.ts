import { uuid } from 'uuidv4';

import Transaction from '../models/Transaction';

interface Balance {
  income: 0;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public create(data: CreateTransactionDTO): Transaction {
    const transaction = {
      ...data,
      id: uuid(),
    };

    this.balance[data.type] += data.value;
    this.balance.total = this.balance.income - this.balance.outcome;

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
