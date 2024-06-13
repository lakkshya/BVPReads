const BagBook = require('../models/bagbookModel');
const mongoose = require('mongoose');

// get all books
const getBagBooks = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const books = await BagBook.find({ userEmail }).populate('bookId', 'title author category').sort({ createdAt: -1 });
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

//create new book
const createBagBook = async (req, res) => {
    const { bookId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ error: 'Invalid bookId' });
    }

    //add doc to db
    try {
        const userEmail = req.user.email;
        const book = await BagBook.create({
            bookId,
            userEmail,
            checkedout: false
        });
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//delete a book
const deleteBagBook = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such book' });
    }

    const book = await BagBook.findOneAndDelete({ _id: id });
    if (!book) {
        return res.status(400).json({ error: 'No such book' });
    }
    res.status(200).json(book);
};

module.exports = {
    getBagBooks,
    createBagBook,
    deleteBagBook,
}