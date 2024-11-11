import { Router } from 'express';
import { addBook, getAllBooks, getBookById, deleteBookById, editBookById } from '../controllers/bookController';

const router = Router();

router.get('/', getAllBooks);
router.post('/', addBook);
router.get('/view/:id', getBookById);
router.delete('/delete/:id', deleteBookById);
router.post('/edit/:id', editBookById);

export default router;