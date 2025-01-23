import { validationResult, query, param } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import Exception from '../Exception';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Exception(
      errors
        .array()
        .map((err) => err.msg)
        .join(', '),
      400,
    );
  }
  next();
};

export const getExpensesValidation = [
  query('limit')
    .optional()
    .isInt({ gt: 0 })
    .withMessage('Limit must be a positive integer'),
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Offset must be a positive integer'),
  query('fromDate')
    .optional()
    .isISO8601()
    .withMessage('fromDate must be a valid ISO date'),
  query('toDate')
    .optional()
    .isISO8601()
    .withMessage('toDate must be a valid ISO date'),
];

export const getExpenseByIdValidation = [
  param('id').isInt().withMessage('ID must be a valid integer'),
];
