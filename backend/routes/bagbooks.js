const express = require('express');

const {
    getBagBooks,
    createBagBook,
    deleteBagBook,
} = require('../controllers/bagbookController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

//require auth for all bagbooks routes
router.use(requireAuth);

//GET all books
router.get('/', getBagBooks);

//POST a new book
router.post('/', createBagBook);

//DELETE a book
router.delete('/:id', deleteBagBook);

module.exports = router;