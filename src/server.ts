import { app } from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Rejection:', err);
});

process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught Exception:', err);
});