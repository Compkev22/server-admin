import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateTeam = [
    body('name')
        .trim()
        .notEmpty().withMessage('El nombre del equipo es requerido')
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),
    body('category')
        .trim()
        .notEmpty().withMessage('La categoría es requerida'),
    checkValidators
];

export const validateUpdateTeamRequest = [
    param('id')
        .isMongoId().withMessage('ID debe ser un ObjectId válido de MongoDB'),
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }),
    body('category')
        .optional()
        .trim(),
    checkValidators
];

export const validateTeamStatusChange = [
    param('id')
        .isMongoId().withMessage('ID debe ser un ObjectId válido de MongoDB'),
    checkValidators
];

export const validateGetTeamById = [
    param('id')
        .isMongoId().withMessage('ID debe ser un ObjectId válido de MongoDB'),
    checkValidators
];