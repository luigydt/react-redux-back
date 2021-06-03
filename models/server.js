const express = require('express');
const cors = require('cors');
const db = require('../database/connection')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.dbConnection();
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use(cors());
        // Lectura y parseo del body
        this.app.use(express.json());
        // Directorio Público
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database Connected');
        }
        catch (error) {
            throw new Error(error);
        }
    }
}


module.exports = Server;
