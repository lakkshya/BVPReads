const Book = require('../models/bookModel');
const mongoose = require('mongoose');

// get all books
const getBooks = async (req, res) => {
    const books = await Book.find({}).sort({createdAt: -1});
    res.status(200).json(books);
};

//get new books
const getNewBooks = async (req, res) => {
    const newBooks = await Book.find({}).sort({ createdAt: -1 }).limit(4);    
    res.status(200).json(newBooks);
};

//get book categories
const getBookCategory = async (req, res) => {
    const category = await Book.aggregate([
        {
            $group: {
                _id: '$category',
                totalCopies: { $sum: '$numberOfCopies' },
            }
        }
    ]);
    res.status(200).json(category);
};

//get a single book
const getBook = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such book'});
    }

    const book = await Book.findById(id);
    if(!book) {
        return res.status(404).json({error: 'No such book'});
    }
    res.status(200).json(book);
};

//create new book
const createBook = async (req, res) => {
    const {title, author, category, numberOfCopies} = req.body;

    //add doc to db
    try {
        const book = await Book.create({title, author, category, numberOfCopies});
        res.status(200).json(book);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

//delete a book
const deleteBook = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such book'});
    }

    const book = await Book.findOneAndDelete({_id: id});
    if(!book) {
        return res.status(400).json({error: 'No such book'});
    }
    res.status(200).json(book);
};

//update a book
const updateBook = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such book'});
    }

    const book = await Book.findOneAndUpdate({_id: id}, {
        ...req.body
    });
    if(!book) {
        return res.status(400).json({error: 'No such book'});
    }
    res.status(200).json(book);
};

module.exports = {
    getBooks,
    getNewBooks,
    getBookCategory,
    getBook,
    createBook,
    deleteBook,
    updateBook
}