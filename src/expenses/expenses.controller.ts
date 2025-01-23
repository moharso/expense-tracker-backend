import { Router, Request, Response } from 'express';
import {
  validateRequest,
  getExpensesValidation,
  getExpenseByIdValidation,
} from '../helpers/middlewares/validator';
import CreateExpenseDTO from './dto/create-expense.dto';
import expensesService from './expenses.service';

const router = Router();

const errorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unknown error';
};

router.post(
  '/post',
  CreateExpenseDTO,
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const expense = await expensesService.createExpense(req.body);
      res.status(201).json({ message: 'Expense added', expense });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error adding expense', error: errorMessage(error) });
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
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving expenses',
        error: errorMessage(error),
      });
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
      res.status(200).json(expense);
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Error retrieving expense',
          error: errorMessage(error),
        });
    }
  },
);

export default router;
