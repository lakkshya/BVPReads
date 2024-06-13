import { useState, useEffect } from 'react';
import { useBagBooksContext } from "../hooks/useBagBooksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import ResourceCategoryPhone from '../components/ResourceCategoryPhone';
import ResourceCategoryLaptop from '../components/ResourceCategoryLaptop';
import AllBooksCardLaptop from '../components/AllBooksCardLaptop';
import AllBooksCardPhone from '../components/AllBooksCardPhone';

const AllBooks = () => {
    const [books, setBooks] = useState(null);
    const [isBookAddedToBag, setIsBookAddedToBag] = useState({});
    const { dispatch } = useBagBooksContext();
    const { user } = useAuthContext();
    const [bookCount, setBookCount] = useState(0);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('/api/books');
            const json = await response.json();

            if (response.ok) {
                setBooks(json);
            }
        };

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
            {/* all books  */}
            <div className="row mb-5">
                <div className="col-12 mt-4" id="allBooks">
                    <div className="row">
                        <div className="section-heading d-flex justify-content-between align-items-center mb-2">
                            <span className="sec-head-main">All Books</span>
                            <a href="/" className="d-flex align-items-center">
                                <i className="bi bi-funnel fs-5"></i><span className="ms-1">Filter</span>
                            </a>
                        </div>
                        {/* laptop list */}
                        <div className="col-12 d-none d-lg-block my-2">
                            <div className="card">
                                <div className="card-body">
                                    <div className="col-12 top-book-card d-flex align-items-center">
                                        <div className="col-lg-4 me-2">
                                            <span className="my-font">Book Title</span>
                                        </div>
                                        <div className="col-lg-4 me-2">
                                            <span className="my-font">Book Author</span>
                                        </div>
                                        <div className="col-lg-2 me-2">
                                            <span className="my-font">Category</span>
                                        </div>
                                        <div className="col-lg-2 d-flex justify-content-center">
                                            <span className="my-font">Add</span>
                                        </div>
                                    </div>
                                    {books && books.map((book) => (
                                        <AllBooksCardLaptop
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

                        {/* mobile list */}
                        {books && books.map((book) => (
                            <AllBooksCardPhone
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
        </>
    );
}

export default AllBooks;