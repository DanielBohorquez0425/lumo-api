import { Request, Response } from 'express';
import { prisma } from '../app';

// Extiende la interfaz Request para incluir 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any; // Cambia 'any' por el tipo de usuario si lo tienes tipado
    }
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: { company: true },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => { // Añade tipo de retorno
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Usuario no autenticado' });
      return;
    }

    const { password, ...userWithoutPassword } = req.user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, companyId } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email, password, companyId },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};