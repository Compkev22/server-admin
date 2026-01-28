//importar las dependencias

import { Router } from "express";
import { getFields } from "./field.controller.js";

const router = Router();

// Rutas GET
router.get('/', getFields);

// Rutas POST


// Rutas PUT

// Rutas Delete

export default router;
