import { Request, Response, NextFunction } from 'express';
import Exception from '../Exception';

export const errorHandler = (err: Error | Exception, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Exception) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Internal Server Error' });
};
