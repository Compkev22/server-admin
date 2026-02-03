import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateTournament = [
    body('name').trim().notEmpty().withMessage('El nombre es requerido'),
    body('startDate').isISO8601().withMessage('Fecha de inicio no válida (ISO8601)'),
    body('endDate').isISO8601().withMessage('Fecha de fin no válida (ISO8601)'),
    checkValidators,
];

export const validateUpdateTournamentRequest = [
    param('id').isMongoId().withMessage('ID debe ser un ObjectId válido'),
    body('name').optional().trim(),
    checkValidators,
];

export const validateTournamentStatusChange = [
    param('id').isMongoId().withMessage('ID debe ser un ObjectId válido'),
    checkValidators,
];

export const validateGetTournamentById = [
    param('id').isMongoId().withMessage('ID debe ser un ObjectId válido'),
    checkValidators,
];