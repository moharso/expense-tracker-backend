import { check } from 'express-validator';

const CreateExpenseDTO = [
  check('name')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 255 })
    .withMessage('Name must not exceed 255 characters'),

  check('amount')
    .isNumeric()
    .withMessage('Amount must be a number')
    .isFloat({ gt: 0 })
    .withMessage('Amount must be a positive number'),

  check('currency')
    .isString()
    .trim()
    .isLength({ min: 3, max: 3 })
    .withMessage('Currency must be a 3-character ISO code'),

  check('category')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isLength({ max: 255 })
    .withMessage('Category must not exceed 255 characters'),

  check('date')
    .isISO8601()
    .withMessage('Date must be in ISO format'),
];

export default CreateExpenseDTO;
