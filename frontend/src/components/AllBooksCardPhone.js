import { useState, useEffect } from "react";

const AllBooksCardPhone = ({ book, user, isBookAddedToBag, handleAddToBag, bookCount }) => {
    const [addedToBag, setAddedToBag] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const overlay = document.querySelector('.overlay');

            if (event.target === overlay) {
                setShowAlert(false);
            }
        };

        setAddedToBag(isBookAddedToBag);
        document.addEventListener("click", handleClickOutside);
    }, [isBookAddedToBag]);

    const handleAddToBagClick = (e) => {
        e.preventDefault();
        if (!user) {
            console.error('You must be logged in');
            setShowAlert(true);
            return;
        }
        handleAddToBag(book._id);
        setAddedToBag(true);
    };

    const closeAlert = () => {
        setShowAlert(false);
    };

    return (
        <div className="col-12 d-block d-lg-none my-2">
            <div className="card">
                <div className="card-body">
                    <div className="col-12 mb-2 d-flex align-items-center">
                        <span className="badge">{book.category}</span>
                    </div>
                    <div className="row">
                        <div className="col-10">
                            <div className="row">
                                <div className="col-12">
                                    <span className="my-title-font">{book.title}</span>
                                </div>
                                <div className="col-12">
                                    <span className="my-subtitle-font">{book.author}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-2 d-flex align-items-end justify-content-end">
                            {!addedToBag && (
                                <a href="/" role="button" onClick={handleAddToBagClick}
                                    className={`btn btn-primary d-flex align-items-center justify-content-between ${bookCount >= 5 ? 'disabled-link' : ''}`}>
                                    <i className="bi bi-handbag"></i>
                                </a>
                            )}
                            {addedToBag && (
                                <a href="/bag" onClick={(e) => e.preventDefault()}
                                    className="btn btn-primary d-flex align-items-center justify-content-between added-link">
                                    <i className="bi bi-check-lg"></i>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showAlert && (
                <div className="overlay">
                    <div className="container addToBag-alert">
                        <div className="row">
                            <div className="col-12 d-flex justify-content-end">
                                <button className="close-btn-2" onClick={closeAlert}><i className="bi bi-x fs-1"></i></button>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <div className="col-12 px-4 px-lg-0 col-lg-8">
                                <div className="col-12 mb-1 d-flex justify-content-center">
                                    <h5 className="text-center">Sign in required</h5>
                                </div>
                                <div className="col-12 text-center mb-3">
                                    <span className="that-font">You must be signed in to add items to the bag.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AllBooksCardPhone;