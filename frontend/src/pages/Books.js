import { useState, useEffect } from 'react';
import { useBagBooksContext } from "../hooks/useBagBooksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import ResourceCategoryPhone from '../components/ResourceCategoryPhone';
import ResourceCategoryLaptop from '../components/ResourceCategoryLaptop';
import BooksCard from '../components/BooksCard';
import NewBooksCard from '../components/NewBooksCard';
import CategoryCard from '../components/CategoryCard';

const Books = () => {
    const [books, setBooks] = useState(null);
    const [latestBooks, setLatestBooks] = useState(null);
    const [categories, setCategories] = useState(null);
    const [isBookAddedToBag, setIsBookAddedToBag] = useState({});
    const {dispatch} = useBagBooksContext();
    const { user } = useAuthContext();
    const [bookCount, setBookCount] = useState(0);

    const fetchBooks = async () => {
        const response = await fetch('/api/books');
        if (response.ok) {
            const json = await response.json();
            setBooks(json);
        }
    };

    const fetchLatestBooks = async () => {
        const response = await fetch('/api/books/newbooks');
        if (response.ok) {
            const json = await response.json();
            setLatestBooks(json);
        }
    };

    const fetchBookCategory = async () => {
        const response = await fetch('/api/books/category');
        if (response.ok) {
            const json = await response.json();
            setCategories(json);
        }
    };

    useEffect(() => {
        const fetchUserBagBooks = async () => {
            if (user) {
                try {
                    const response = await fetch('/api/bagbooks', {
                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                    });

                    if (response.ok) {
                        const json = await response.json();
                        const initialBookStatus = {};
                        json.forEach((bagBook) => {
                            initialBookStatus[bagBook.bookId._id] = true;
                        });
                        setIsBookAddedToBag(initialBookStatus);
                        setBookCount(json.length);
                    }
                } catch (error) {
                    console.error('Error fetching user bag books:', error);
                }
            }
        };

        fetchBooks();
        fetchLatestBooks();
        fetchBookCategory();
        fetchUserBagBooks();
    }, [user]);

    const handleAddToBag = async (bookId) => {

        try {
            if (Object.keys(isBookAddedToBag).length >= 5) {
                console.log('Cannot add more than 5 books to the bag');
                return;
            }

            if (isBookAddedToBag[bookId]) {
                console.log('Book is already in the bag');
                return;
            }

            const response = await fetch('/api/bagbooks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ bookId })
            });
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'CREATE_BAGBOOK', payload: json });
                setIsBookAddedToBag(prevState => ({
                    ...prevState,
                    [bookId]: true
                }));
                setBookCount(prevCount => prevCount + 1);
            } else {
                console.log(json.error);
            }
        } catch (error) {
            console.error('Error adding book to bag:', error);
        }
    };

    return (
        <>
            <ResourceCategoryPhone />
            <ResourceCategoryLaptop />
            {/* new books */}
            <div className="row">
                <div className="col-12 mt-4" id="newBooks">
                    <div className="row">
                        <div className="section-heading d-flex justify-content-between align-items-center mb-2">
                            <span className="sec-head-main">New Books</span>
                        </div>
                        {latestBooks && latestBooks.map((book) => (
                            <NewBooksCard 
                                key={book._id} 
                                book={book} 
                                user={user}
                                isBookAddedToBag={isBookAddedToBag[book._id]}
                                handleAddToBag={handleAddToBag}
                                bookCount={bookCount}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="row mb-5">
                {/* category */}
                <div className="col-12 col-lg-6 mt-4" id="category">
                    <div className="row">
                        <div className="section-heading d-flex justify-content-between align-items-center mb-2">
                            <span className="sec-head-main">Categories</span>
                        </div>
                        {categories && categories.map((category) => (
                            <CategoryCard 
                                key={category._id} 
                                category={category} 
                            />
                        ))}
                    </div>
                </div>

                {/* all books */}
                <div className="col-12 col-lg-6 mt-4" id="allBooks">
                    <div className="row">
                        <div className="section-heading d-flex justify-content-between align-items-center mb-2">
                            <span className="sec-head-main">All Books</span>
                            <a href="/resources/books/allbooks">
                                <span>Show All</span>
                            </a>
                        </div>
                        <div className="col-12 my-2">
                            <div className="card fixed-card">
                                <div className="card-body">
                                    <div className="col-12 top-book-card d-flex align-items-center">
                                        <div className="col-5 me-1">
                                            <span className="my-font">Book Title</span>
                                        </div>
                                        <div className="col-5 me-1">
                                            <span className="my-font">Book Author</span>
                                        </div>
                                        <div className="col-2 d-flex justify-content-center">
                                            <span className="my-font">Add</span>
                                        </div>
                                    </div>
                                    {books && books.map((book) => (
                                        <BooksCard 
                                            key={book._id} 
                                            book={book} 
                                            user={user}
                                            isBookAddedToBag={isBookAddedToBag[book._id]}
                                            handleAddToBag={handleAddToBag}
                                            bookCount={bookCount}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Books;