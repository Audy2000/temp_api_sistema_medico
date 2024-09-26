// src/index.ts
import 'reflect-metadata';
import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import { AppDataSource } from './data-source';
import usuarioRoutes from './routes/usuarioRoutes';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type','Authorization'],
 // credentials: true,
};


app.use(cors(corsOptions));


// Servir archivos estáticos de la carpeta 'uploads'
app.use('/uploads', express.static('uploads'));

// Middleware para parsear JSON
app.use(express.json());

// Usar las rutas definidas
app.use('/api', usuarioRoutes);

// Ruta básica
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Conectar a la base de datos y arrancar el servidor
AppDataSource.initialize()
  .then(() => {
    console.log('Connected to the database');

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(error => console.log('Database connection failed:', error));
