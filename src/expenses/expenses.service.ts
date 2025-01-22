import expensesRepository from './expenses.repository';

const createExpense = async (data: any) => {
  return await expensesRepository.create(data);
};

const getExpenses = async () => {
  return await expensesRepository.findAll();
};


export default { createExpense, getExpenses };