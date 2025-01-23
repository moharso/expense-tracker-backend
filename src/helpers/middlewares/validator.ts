import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import  Exception from "../Exception"

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Exception(errors.array().map(err => err.msg).join(', '), 400);
  }
  next();
};
