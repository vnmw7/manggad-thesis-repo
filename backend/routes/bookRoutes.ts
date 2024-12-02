import { Router } from 'express';
import { bookController } from '../controllers/bookController';

const router = Router();

// "/books" routes
router.get('/', bookController.getAllBooks);
router.post('/', bookController.addBook);
router.get('/view/:id', bookController.getBookById);
router.delete('/delete/:id', bookController.deleteBookById);
router.post('/edit/:id', bookController.editBookById);
router.post('/search/', bookController.searchBooks);
router.post('/addEdit', bookController.addEditBook);

export default router;