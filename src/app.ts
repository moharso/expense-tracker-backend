import express from 'express';
import routes from './routes/ping';
import config from './config';
import expenseRoutes from './routes/expense';
import db from './db/db.service';

const app = express();

app.use(express.json());

app.use('/ping', routes);

app.use('/expenses', expenseRoutes);

const startServer = async () => {
  try {
    await db.$connect();
    console.log('Connected to the database');

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
};

startServer();

export default app;
