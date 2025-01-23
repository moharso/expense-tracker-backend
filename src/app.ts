import express from 'express';
import expenseController from './expenses/expenses.controller';
import { errorHandler } from './helpers/middlewares/errorHandler';

const app = express();

app.use(express.json());

app.use('/api/expenses', expenseController);

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use(errorHandler);

export default app;
