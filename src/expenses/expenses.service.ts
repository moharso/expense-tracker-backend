import expensesRepository from './expenses.repository';
import { Expense } from './entity/expense.entity';

const createExpense = async (data: Expense) => {
  return await expensesRepository.create(data);
};

const getExpenses = async (query: {
  limit?: number;
  offset?: number;
  fromDate?: Date;
  toDate?: Date;
}) => {
  return await expensesRepository.findAll(query);
};

const getExpenseById = async (id: number) => {
  const expense = await expensesRepository.findById(id);
  if (!expense) {
    throw new Error(`Expense with ID ${id} not found`);
  }
  return expense;
};

export default { createExpense, getExpenses, getExpenseById };
