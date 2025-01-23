import db from '../db/db.service';
import { Expense } from './entity/expense.entity';

interface GetExpensesOptions {
  limit?: number;
  offset?: number;
  fromDate?: Date;
  toDate?: Date;
}

interface FilterOptions {
  date?: {
    gte?: Date;
    lte?: Date;
  };
}

const create = async (data: Omit<Expense, 'id'>) => {
  return await db.expense.create({ data });
};

const findAll = async ({
  limit,
  offset,
  fromDate,
  toDate,
}: GetExpensesOptions) => {
  const filters: FilterOptions = {};

  if (fromDate || toDate) {
    filters.date = {};
    if (fromDate) filters.date.gte = fromDate;
    if (toDate) filters.date.lte = toDate;
  }

  return await db.expense.findMany({
    where: filters,
    skip: offset,
    take: limit,
    orderBy: { date: 'desc' },
  });
};

const findById = async (id: number) => {
  return await db.expense.findUnique({ where: { id } });
};

export default { create, findAll, findById };
