import expensesRepository from './expenses.repository';
import { Expense } from './entity/expense.entity';

const createExpense = (data: Expense) => expensesRepository.create(data);
const getExpenses = (query: {
  limit?: number;
  offset?: number;
  fromDate?: Date;
  toDate?: Date;
}) => expensesRepository.findAll(query);
const getExpenseById = (id: number) => expensesRepository.findById(id);
const updateExpense = (id: number, data: Partial<Expense>) =>
  expensesRepository.update(id, data);
const deleteExpense = (id: number) => expensesRepository.deleteOne(id);

export default {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
