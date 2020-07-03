import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface ExecuteResponse {
  transactions: Transaction[];
  balance: {
    income: number;
    outcome: number;
    total: number;
  };
}

class ListTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): ExecuteResponse {
    const balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const transactions = this.transactionsRepository.all();

    for (let index = 0; index < transactions.length; index += 1) {
      const transaction = transactions[index];

      balance[transaction.type] += transaction.value;
    }

    balance.total = balance.income - balance.outcome;

    return { transactions, balance };
  }
}

export default ListTransactionService;
