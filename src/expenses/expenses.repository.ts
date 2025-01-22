import db from '../db/db.service';
import { Expense } from './entity/expense.entity';

const create = async (data: Omit<Expense, 'id'>) => {
  return await db.expense.create({ data });
};

const findAll = async () => {
    return await db.expense.findMany();
  };

  
  export default { create, findAll };
