import { Router } from 'express';
import { getUsers, createUser, getCurrentUser } from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/me', authenticate, getCurrentUser);

export default router;