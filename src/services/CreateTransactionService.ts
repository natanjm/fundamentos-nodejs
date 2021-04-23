import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request{
  title: string,
  value: number,
  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {
    const {income, outcome, total} = this.transactionsRepository.getBalance();

    if(type == 'outcome' && value > total)
      throw Error('Not able to complete the transaction.');
    
    const newTransaction = this.transactionsRepository.create({title, value, type});
    return newTransaction;
  }
}

export default CreateTransactionService;
