import { Request, Response } from 'express';
import Exception from '../Exception';
import logger from '../Logger';

export const errorHandler = (
  err: Error | Exception,
  req: Request,
  res: Response,
) => {
  if (err instanceof Exception) {
    logger.error(`Exception: ${err.message}`);
    return res.status(err.statusCode).json({ message: err.message });
  }
  logger.error(`Error: ${err.message}`);
  return res.status(500).json({ message: 'Internal Server Error' });
};
