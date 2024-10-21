import { Router } from 'express';
import { getAllUsers, getUserById, addUser } from '../controllers/userController';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', addUser);

export default router;