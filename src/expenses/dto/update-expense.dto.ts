import { body } from 'express-validator';

const UpdateExpenseDTO = [
  body('name')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Name must not exceed 255 characters'),

  body('amount')
    .optional()
    .isNumeric()
    .withMessage('Amount must be a number')
    .isFloat({ gt: 0 })
    .withMessage('Amount must be a positive number'),

  body('currency')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 3, max: 3 })
    .withMessage('Currency must be a 3-character ISO code'),

  body('category')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Category must not exceed 255 characters'),

  body('date').optional().isISO8601().withMessage('Date must be in ISO format'),
];

export default UpdateExpenseDTO;
