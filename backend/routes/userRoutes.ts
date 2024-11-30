import { Router } from 'express';
import { getAllUsers, getUserById, addUser } from '../controllers/userController';

const router = Router();

// "/users"
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', addUser);

export default router;