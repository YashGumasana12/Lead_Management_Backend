import { body } from 'express-validator';

export const createLeadValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('status')
    .isIn(['New', 'Engaged', 'Proposal Sent', 'Closed-Won', 'Closed-Lost'])
    .withMessage('Invalid status'),
];

export const updateLeadValidation = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Please enter a valid email'),
  body('status')
    .optional()
    .isIn(['New', 'Engaged', 'Proposal Sent', 'Closed-Won', 'Closed-Lost'])
    .withMessage('Invalid status'),
]; 