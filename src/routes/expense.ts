import { Router, Request, Response } from 'express';
import { getDb } from '../db/db.service';

const router = Router();
const db = getDb();

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unknown error occurred';
};

router.post('/', (req: Request, res: Response) => {
  const { name, amount, currency, category, date } = req.body;
  if (!name || !amount || !currency || !category || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const stmt = db.prepare(
      'INSERT INTO expenses (name, amount, currency, category, date) VALUES (?, ?, ?, ?, ?)',
    );
    const info = stmt.run(name, amount, currency, category, date);
    res
      .status(201)
      .json({ id: info.lastInsertRowid, message: 'Expense added' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error adding expense', error: getErrorMessage(error) });
  }
});

router.get('/', (req: Request, res: Response) => {
  try {
    const rows = db.prepare('SELECT * FROM expenses').all();
    res.status(200).json(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error adding expense', error: getErrorMessage(error) });
  }
});

export default router;
