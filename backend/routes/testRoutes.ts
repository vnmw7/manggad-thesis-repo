import { Router } from 'express';
import { addTest, getAllTests } from '../controllers/testController';

const router = Router();

router.get('/', getAllTests);
router.post('/', addTest);

export default router;