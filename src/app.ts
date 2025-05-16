import express from 'express';
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/userRoutes';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bienvenido a la API', 
    endpoints: {
      users: '/users',
      auth: '/api/auth'
    }
  });
});

// Rutas
app.use('/users', userRoutes);
// Aquí se pueden agregar más rutas como auth, breaks, etc.

export { app, prisma };