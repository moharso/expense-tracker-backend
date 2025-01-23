import { Router, Request, Response } from 'express';
import {
  validateRequest,
  getExpensesValidation,
  getExpenseByIdValidation,
} from '../helpers/middlewares/validator';
import CreateExpenseDTO from './dto/create-expense.dto';
import expensesService from './expenses.service';
import UpdateExpenseDTO from './dto/update-expense.dto';
import logger from '../helpers/Logger';

const router = Router();

const errorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unknown error';
};

const handleErrorResponse = (res: Response, error: unknown) => {
  logger.error(`Error: ${errorMessage(error)}`);
  res
    .status(500)
    .json({ message: 'An error occurred', error: errorMessage(error) });
};

router.post(
  '/post',
  CreateExpenseDTO,
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const expense = await expensesService.createExpense(req.body);
      logger.info(`Expense created: ${expense.name}, ID: ${expense.id}`);
      res.status(201).json({ message: 'Expense added', expense });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  },
);

router.get(
  '/getAll',
  getExpensesValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const { limit, offset, fromDate, toDate } = req.query;

    try {
      const expenses = await expensesService.getExpenses({
        limit: limit ? parseInt(limit as string) : undefined,
        offset: offset ? parseInt(offset as string) : undefined,
        fromDate: fromDate ? new Date(fromDate as string) : undefined,
        toDate: toDate ? new Date(toDate as string) : undefined,
      });
      logger.info(`Fetched ${expenses.length} expenses`);
      res.status(200).json(expenses);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  },
);

router.get(
  '/:id',
  getExpenseByIdValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const expense = await expensesService.getExpenseById(parseInt(id));
      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
      logger.info(`Fetched expense: ID ${id}, Name: ${expense.name}`);
      res.status(200).json(expense);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  },
);

router.patch(
  '/:id',
  UpdateExpenseDTO,
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const expenseData = req.body;

    try {
      const updatedExpense = await expensesService.updateExpense(
        Number(id),
        expenseData,
      );
      if (!updatedExpense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
      logger.info(`Expense updated: ID ${id}, Name: ${updatedExpense.name}`);
      res.status(200).json({ message: 'Expense updated', updatedExpense });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  },
);

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedExpense = await expensesService.deleteExpense(
      parseInt(id, 10),
    );
    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    logger.info(`Expense deleted: ID ${id}`);
    res.status(200).json({ message: 'Expense deleted', deletedExpense });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

export default router;
