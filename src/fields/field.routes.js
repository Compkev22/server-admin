import { Router } from 'express';
import {
    getFields,
    getFieldById,
    createField,
    updateField,
    changeFieldStatus,
} from './field.controller.js';
import {
    validateCreateField,
    validateUpdateFieldRequest,
    validateFieldStatusChange,
    validateGetFieldById,
} from '../../middlewares/field-validators.js';
import { uploadFieldImage } from '../../middlewares/file-uploaders.js';
 
const router = Router();
 
// Rutas GET
router.get('/', getFields);
router.get('/:id', validateGetFieldById, getFieldById);
 
// Rutas POST - Requieren autenticación
router.post(
    '/',
    uploadFieldImage.single('image'),
    validateCreateField,
    createField
);
 
// Rutas PUT - Requieren autenticación
router.put(
    '/:id',
    uploadFieldImage.single('image'),
    validateUpdateFieldRequest,
    updateField
);
router.put('/:id/activate', validateFieldStatusChange, changeFieldStatus);
router.put('/:id/deactivate', validateFieldStatusChange, changeFieldStatus);
 
export default router;