// src/index.ts
import 'reflect-metadata';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import usuarioRoutes from './routes/usuarioRoutes';

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type','Authorization'],
 // credentials: true,
};

app.use(cors(corsOptions));


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
