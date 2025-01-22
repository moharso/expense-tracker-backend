import { Router, Request, Response } from 'express';
import db from '../db/db.service';

const router = Router();

const errorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unknown error';
};

router.post('/', async (req: Request, res: Response) => {
  const { name, amount, currency, category, date } = req.body;
  if (!name || !amount || !currency || !category || !date) {
    return res.status(400).json({ message: 'Complete all fields' });
  }

  try {
    const expense = await db.expense.create({
      data: {
        name,
        amount: parseFloat(amount),
        currency,
        category,
        date: new Date(date),
      },
    });
    res.status(201).json({ id: expense.id, message: 'Expense added', expense });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error adding expense', error: errorMessage(error) });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const expenses = await db.expense.findMany();
    res.status(200).json(expenses);
  } catch (error) {
    res
      .status(500)
      .json({
        message: 'Error retrieving expenses',
        error: errorMessage(error),
      });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const expense = await db.expense.findUnique({
      where: { id: parseInt(id, 10) },
    });

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
});

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedExpense = await db.expense.delete({
      where: { id: parseInt(id, 10) },
    });

    res.status(200).json({ message: 'Expense deleted', deletedExpense });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting expense', error: errorMessage(error) });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, amount, currency, category, date } = req.body;

  try {
    const updatedExpense = await db.expense.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        amount: parseFloat(amount),
        currency,
        category,
        date: new Date(date),
      },
    });
    res.status(200).json({ message: 'Expense updated', updatedExpense });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating expense', error: errorMessage(error) });
  }
});

export default router;
