import { useState, useEffect } from "react";

const NewBooksCard = ({ book, user, isBookAddedToBag, handleAddToBag, bookCount }) => {
    const [addedToBag, setAddedToBag] = useState(isBookAddedToBag);
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
        <div className="col-12 col-sm-6 col-lg-3 my-2">
            <div className="card">
                <div className="card-body">
                    <span className="badge mb-2">{book.category}</span><br />
                    <span className="card-title">{book.title}</span><br />
                    <span className="card-subtitle mb-5 text-body-secondary">{book.author}</span><br />
                    <div className="col-12 d-grid gap-2">
                        {!addedToBag && (
                            <button onClick={handleAddToBagClick}
                                className={`btn btn-primary addItem d-flex align-items-center justify-content-between ${bookCount >= 5 ? 'disabled-link' : ''}`}>
                                <span className="">Add to Bag</span>
                                <i className="bi bi-handbag"></i>
                            </button>
                        )}
                        {addedToBag && (
                            <button onClick={(e) => e.preventDefault()}
                                className="btn addItem btn-primary d-flex align-items-center justify-content-between added-link">
                                <span className="">Added to Bag</span>
                                <i className="bi bi-check-lg"></i>
                            </button>
                        )}
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

export default NewBooksCard;