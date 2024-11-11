import { Router } from 'express';
import { addBook, getAllBooks } from '../controllers/bookController';

const router = Router();

router.get('/', getAllBooks);
router.post('/', addBook);

export default router;