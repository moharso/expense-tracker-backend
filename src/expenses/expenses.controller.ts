import { Router, Request, Response } from 'express';
import { validateRequest } from '../helpers/middlewares/validator';
import CreateExpenseDTO from './dto/create-expense.dto';
import expensesService from './expenses.service';

const router = Router();

const errorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Unknown error';
  };

router.post('/post', CreateExpenseDTO, validateRequest, async (req: Request, res: Response) => {
  try {
    const expense = await expensesService.createExpense(req.body);
    res.status(201).json({ message: 'Expense added', expense });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error adding expense', error: errorMessage(error) });
  }
});

router.get('/getAll', async (req: Request, res: Response) => {
    try {
      const expenses = await expensesService.getExpenses();
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving expenses',
        error: errorMessage(error),
      });
    }
  });

export default router;
