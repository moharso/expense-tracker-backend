import express from 'express';
import routes from './routes/ping';
import config from './config';

const app = express();

app.use(express.json());

app.use('/ping', routes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

export default app;
