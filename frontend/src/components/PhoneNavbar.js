import { Link, NavLink } from "react-router-dom";

const PhoneNavbar = () => {
    return (
        <div className="row my-navbar">
            <div className="col-12 d-block d-sm-none">
                <nav className="navbar navbar-dark bg-dark fixed-top">
                    <div className="container-fluid">
                        <Link className="navbar-brand text-white" to="/">BVICAM Library</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                            aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                            <span className="bi bi-three-dots"></span>
                        </button>
                        <div className="bg-dark offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar"
                            aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-header text-white">
                                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">BVICAM Library</h5>
                                <button type="button" className="btn-close bg-light" data-bs-dismiss="offcanvas"
                                    aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <div className="bg-dark p-4">
                                    <ul className="nav nav-pills flex-column mt-1">
                                        <li className="nav-item my-2">
                                            <NavLink to="/" className="nav-link text-white">
                                                <i className="fs-6 bi bi-house-door"></i><span className="fs-6 ms-3">Home</span>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item my-2">
                                            <NavLink to="/resources/books" className="nav-link text-white">
                                                <i className="fs-6 bi bi-book"></i><span className="fs-6 ms-3">Resources</span>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item my-2">
                                            <NavLink to="/contact" className="nav-link text-white">
                                                <i className="fs-6 bi bi-telephone"></i><span className="fs-6 ms-3">Contact</span>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item my-2">
                                            <NavLink to="/about" className="nav-link text-white">
                                                <i className="fs-6 bi bi-info-square"></i><span className="fs-6 ms-3">About Us</span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div >
        </div >
    );
}

export default PhoneNavbar;