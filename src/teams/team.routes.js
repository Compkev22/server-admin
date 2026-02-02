import { Router } from 'express';
import { getTeams, getTeamById, createTeam, updateTeam, changeTeamStatus } from './team.controller.js';
import { 
    validateCreateTeam, 
    validateUpdateTeamRequest, 
    validateTeamStatusChange, 
    validateGetTeamById 
} from '../../middlewares/team-validators.js';
import { uploadTeamImage } from '../../middlewares/file-uploaders.js';

const router = Router();

router.get('/', getTeams);
router.get('/:id', validateGetTeamById, getTeamById);

router.post('/', uploadTeamImage.single('image'), validateCreateTeam, createTeam);

router.put('/:id', uploadTeamImage.single('image'), validateUpdateTeamRequest, updateTeam);
router.put('/:id/activate', validateTeamStatusChange, changeTeamStatus);
router.put('/:id/deactivate', validateTeamStatusChange, changeTeamStatus);

export default router;