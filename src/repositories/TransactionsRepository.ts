import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const valorInicial = 0;
    let income = 0;
    let outcome = 0;

    this.transactions.reduce(function (trs, tr) {
      if (tr.type === 'income') {
        income += tr.value;
      } else {
        outcome += tr.value;
      }

      return trs;
    }, valorInicial);

    const total = income - outcome;

    const balance: Balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create(
    title: string,
    value: number,
    type: 'income' | 'outcome',
  ): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
