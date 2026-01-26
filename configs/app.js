'use strict';

//Importaciones
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { corsOptions } from './cors-configuration.js'; // Agregué el .js, es buena práctica en módulos

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

//Función para iniciar el servidor
// CORRECCIÓN 1: Quitamos 'app' de los paréntesis porque la creamos adentro
const initServer = async () => { 
    const app = express();
    const PORT = process.env.PORT || 3001;

    try {
        //Configuraciones de los middlewares (Mi aplicación)
        // CORRECCIÓN 2: Corregí 'middlewares' a 'middleware' (singular) para que coincida con la función de arriba
        middleware(app); 

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`);
        });

        //Primera ruta
        app.get(`${BASE_URL}/health`, (req, res) => {
            res.status(200).json({
                status: 'ok',
                service: 'KinalSport Admin',
                version: '1.0.0'
            });
        });

    } catch (error) {
        console.log(error);
    }
}

export { initServer };