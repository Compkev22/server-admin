'use strict';

// Importaciones
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './db.js';
import { requestLimit } from '../middlewares/request-limit.js';
import { corsOptions } from './cors-configuration.js';
import { helmetConfiguration } from './helmet-configuration.js';
import { errorHandler } from '../middlewares/handle-errors.js';

// Rutas
import fieldRoutes from '../src/fields/field.routes.js';
import reservationRoutes from '../src/reservations/reservation.routes.js';
import teamRoutes from '../src/teams/team.routes.js';
import tournamentRoutes from '../src/tournaments/tournaments.routes.js';

const BASE_PATH = '/kinalSportsAdmin/v1';

// Configuraicón de mi aplicación
const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(express.json({ limit: '10mb' }));
    app.use(cors(corsOptions));
    app.use(helmet(helmetConfiguration));
    app.use(requestLimit);
    app.use(morgan('dev'));
}

// Integración de todas las rutas
const routes = (app) => {
    app.use(`${BASE_PATH}/fields`, fieldRoutes);
    app.use(`${BASE_PATH}/reservations`, reservationRoutes);
    app.use(`${BASE_PATH}/teams`, teamRoutes);
    app.use(`${BASE_PATH}/tournaments`, tournamentRoutes);

    app.get(`${BASE_PATH}/health`, (req, res) => {
        res.status(200).json({
            status: 'Healthy',
            timestamp: new Date().toISOString(),
            service: 'KinalSports Admin Server',
        });
    });

    // 404 handler
    app.use((req, res) => {
        res.status(404).json({
            success: false,
            message: 'Endpoint no encontrado en Admin API',
        });
    });
}


// Función para iniciar el servidor
const initServer = async (app) => {
    // Cración de la instancia de la aplicación
    app = express();
    const PORT = process.env.PORT || 3001;
    app.set('trust proxy', 1);

    try {
        // Configuración de los middlewares (Mi aplicación)
        await dbConnection();
        middlewares(app);
        routes(app);
        app.use(errorHandler);

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`Base URL: http://localhost:${PORT}${BASE_PATH}`);
        });

    } catch (error) {
        console.error(`Error starting Admin Server: ${err.message}`);
        process.exit(1)
    }
}

export { initServer };