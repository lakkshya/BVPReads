import { Link } from 'react-router-dom';
import libraryImg from '../assets/library.png';

const Home = () => {
    return (
        <>
            <div className="row d-flex align-items-center">
                {/* library tour */}
                <div className="col-lg-8 col-12 mt-4" id="libraryTour">
                    <a href="/" className="card text-bg-dark border-0">
                        <img src={libraryImg} className="card-img" alt="..." />
                        <div className="card-img-overlay" id="myOverlay">
                            <div className="text-white" id="myOverlayText">
                                <span id="uptext">WATCH THE</span>
                                <br />
                                <span id="downtext">Library Tour</span>
                            </div>
                        </div>
                    </a>
                </div>
                {/* library status */}
                <div className="col-lg-4 col-12 mt-5 mt-lg-4" id="libraryStatus">
                    <div className="row">
                        <span className="sec-head-main">Library Status</span>
                        <div className="col-6 mt-2">
                            <div className="card">
                                <div className="card-body my-card-body">
                                    <h1 className="card-title">25</h1>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">Seats Occupied</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 mt-2">
                            <div className="card">
                                <div className="card-body my-card-body">
                                    <h1 className="card-title">95</h1>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">Seats Available</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-4">
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary" type="button">Check In Library</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* resources */}
            <div className="row my-5" id="resources">
                <span className="sec-head-main">Resources</span>
                <div className="col-lg-3 col-6 my-2">
                    <Link to="/resources/books" className="text-decoration-none">
                        <div className="card">
                            <div className="card-body text-center">
                                <i className="bi bi-book fs-1 d-block mb-2"></i>
                                <h6 className="card-subtitle mb-2 text-body-secondary">Books</h6>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-lg-3 col-6 my-2">
                    <Link to="/" className="text-decoration-none">
                        <div className="card">
                            <div className="card-body text-center">
                                <i className="bi bi-journal-bookmark fs-1 d-block mb-2"></i>
                                <h6 className="card-subtitle mb-2 text-body-secondary">EBooks</h6>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-lg-3 col-6 my-2">
                    <Link to="/" className="text-decoration-none">
                        <div className="card">
                            <div className="card-body text-center">
                                <i className="bi bi-file-earmark-text fs-1 d-block mb-2"></i>
                                <h6 className="card-subtitle mb-2 text-body-secondary">Previous Papers</h6>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-lg-3 col-6 my-2">
                    <Link to="/" className="text-decoration-none">
                        <div className="card">
                            <div className="card-body text-center">
                                <i className="bi bi-journal-text fs-1 d-block mb-2"></i>
                                <h6 className="card-subtitle mb-2 text-body-secondary">Syllabus</h6>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Home;