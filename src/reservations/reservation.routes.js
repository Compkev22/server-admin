import { Router } from 'express';
import {
    getReservations,
    getReservationById,
    createReservation,
    confirmReservation
} from './reservation.controller.js';
import {
    validateCreateReservation,
    validateGetReservationById
} from '../../middlewares/reservation-validators.js';

const router = Router();

router.get('/', getReservations);
router.get('/:id', validateGetReservationById, getReservationById);

router.post('/', validateCreateReservation, createReservation);

// Endpoint específico de confirmación según tu tabla
router.put('/:id/confirm', validateGetReservationById, confirmReservation);

export default router;