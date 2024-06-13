import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBagBooksContext } from "../hooks/useBagBooksContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Bag = () => {
    const { bagbooks, dispatch } = useBagBooksContext();
    const { user } = useAuthContext();

    const handleDelete = async (bagbookId) => {
        if (!user) {
            console.error('You must be logged in');
            return;
        }
        const response = await fetch('/api/bagbooks/' + bagbookId, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();
        if (response.ok) {
            dispatch({ type: 'DELETE_BAGBOOK', payload: json });
        }
    };

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('/api/bagbooks', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_BAGBOOKS', payload: json });
            }
        };

        if (user) {
            fetchBooks();
        }
    }, [dispatch, user]);

    return (
        // bag 
        <div className="row" id="bag">
            <div className="col-12">
                <div className="section-heading d-flex justify-content-between align-items-center mb-2 mt-4">
                    <span className="sec-head-main">My Bag</span>
                </div>
                {user && (
                    <div className="row">
                        {bagbooks && bagbooks.length > 0 ? (
                            <div className="col-12 py-2" id="bagContainer">
                                {/* bag card */}
                                {bagbooks.map((bagbook) => (
                                    <div className="row bag-card" key={bagbook._id}>
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-10">
                                                            <div className="row">
                                                                <div className="col-12 mb-2 d-flex align-items-center">
                                                                    <span className="badge">{bagbook.bookId.category}</span>
                                                                </div>
                                                                <div className="col-12">
                                                                    <span className="my-title-font">{bagbook.bookId.title}</span>
                                                                    <span className="my-subtitle-font"> by {bagbook.bookId.author}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-2 d-flex align-items-end justify-content-end">
                                                            <button onClick={() => handleDelete(bagbook._id)}
                                                                className="btn btn-primary removeItem d-flex align-items-center justify-content-between">
                                                                <i className="bi bi-x fs-5"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {/* checkout */}
                                <div className="row mt-4 d-flex justify-content-center text-center">
                                    <div className="col-12 col-md-8">
                                        <span className="that-font">Upon successful checkout, a slip will be automatically
                                            generated with a unique reference number. Present this slip at the library
                                            counter to collect your books.</span>
                                    </div>
                                </div>
                                <div className="row mt-4 d-flex justify-content-center">
                                    <div className="col-12 col-md-8 d-grid gap-2">
                                        <button className="btn btn-primary" type="button"
                                            id="checkoutButton">Checkout</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="col-12 py-2" id="bagContainer">
                                <h5 className="text-center">Empty Bag</h5>
                                <div className="d-flex justify-content-center mt-4">
                                    <Link to="/resources/books" className="btn my-btn">Add Books</Link>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {!user && (
                    <div id="bagContainer">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-10 col-md-6">
                                <span><i className="bi bi-cone-striped"></i></span>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-12 mb-4">
                                <span className="warning-font">You must Sign in first to access your Bag</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Bag;