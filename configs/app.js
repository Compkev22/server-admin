'use strict';

//Importaciones
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { corsOptions } from './cors-configuration.js'; // Agregué el .js, es buena práctica en módulos
import { dbConnection} from './db.js';

//Rutas 
import fieldRoutes from '../src/fields/field.routes.js';
import teamRoutes from '../src/teams/team.routes.js'
const BASE_URL = '/kinalSportAdmin/v1';

// Configuraciones de los middlewares
/* Se almacena una función para que pueda ser exportada
o usada al crear la instancia de la aplicacion */
const middleware = (app) => {
    //Limitamos el acceso y el tamaño de las consultas
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    //Las consultas Json tendrán un tamaño máximo de 10mb
    app.use(express.json({ limit: '10mb' }));
    //Importamos los métodos creados anteriormente
    app.use(cors(corsOptions));
    //Morgan nos ayudará a detectar errores del lado del usuario
    app.use(morgan('dev'));
}

//Integracion de todas las rutas
const routes = (app) => {
    app.use(`${BASE_URL}/fields`, fieldRoutes);
    app.use(`${BASE_URL}/teams`, teamRoutes);
}

//Función para iniciar el servidor
// CORRECCIÓN 1: Quitamos 'app' de los paréntesis porque la creamos adentro
const initServer = async () => { 
    const app = express();
    const PORT = process.env.PORT || 3001;

    try {
        // 1. Conectar a DB (Usa await para esperar la conexión)
        await dbConnection(); 
        
        // 2. Configurar Middlewares
        middleware(app); 
        
        // 3. Configurar Rutas (Incluyendo el health check)
        routes(app);

        // Mueve el app.get del health check AQUÍ (antes del listen)
        app.get(`${BASE_URL}/health`, (req, res) => {
            res.status(200).json({ status: 'ok', service: 'KinalSport Admin' });
        });

        // 4. Iniciar escucha
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });

    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
}

export { initServer };