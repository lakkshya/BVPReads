const express = require('express');

const {
    getBooks,
    getNewBooks,
    getBookCategory,
    getBook,
    createBook,
    deleteBook,
    updateBook
} = require('../controllers/bookController');

const router = express.Router();

//GET all books
router.get('/', getBooks);

//GET new books
router.get('/newbooks', getNewBooks);

//GET book category
router.get('/category', getBookCategory);

//GET a single book
router.get('/:id', getBook);

//POST a new book
router.post('/', createBook);

//DELETE a book
router.delete('/:id', deleteBook);

//UPDATE a book
router.patch('/:id', updateBook);

module.exports = router;