import { Router } from 'express';
import { bookController } from '../controllers/bookController';

const router = Router();

router.get('/', bookController.getAllBooks);
router.post('/', bookController.addBook);
router.get('/view/:id', bookController.getBookById);
router.delete('/delete/:id', bookController.deleteBookById);
router.post('/edit/:id', bookController.editBookById);
router.get('/search/', bookController.searchBooks);

export default router;