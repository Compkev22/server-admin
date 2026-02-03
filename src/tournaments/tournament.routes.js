import { Router } from 'express';
import {
    getTournaments,
    getTournamentById,
    createTournament,
    updateTournament,
    changeTournamentStatus
} from './tournament.controller.js';
import {
    validateCreateTournament,
    validateUpdateTournamentRequest,
    validateTournamentStatusChange,
    validateGetTournamentById
} from '../../middlewares/tournament-validators.js';
import { uploadTournamentImage } from '../../middlewares/file-uploaders.js';

const router = Router();

router.get('/', getTournaments);
router.get('/:id', validateGetTournamentById, getTournamentById);

router.post(
    '/',
    uploadTournamentImage.single('image'),
    validateCreateTournament,
    createTournament
);

router.put(
    '/:id',
    uploadTournamentImage.single('image'),
    validateUpdateTournamentRequest,
    updateTournament
);
router.put('/:id/activate', validateTournamentStatusChange, changeTournamentStatus);
router.put('/:id/deactivate', validateTournamentStatusChange, changeTournamentStatus);

export default router;