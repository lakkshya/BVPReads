import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return ( 
        <div className="bg-dark col-auto min-vh-100 d-none d-sm-block d-flex flex-column justify-content-between">
        <div className="bg-dark p-2">
          <Link to="/" className="d-flex text-decoration-none mt-4 align-items-center text-white justify-content-center">
            <h5>BVICAM Library</h5>
          </Link>
          <ul className="nav nav-pills flex-column mt-5">
            <li className="nav-item my-2">
              <NavLink to="/" className="nav-link text-white">
                <i className="fs-6 bi bi-house-door"></i><span className="fs-6 ms-3 d-none d-lg-inline">Home</span>
              </NavLink>
            </li>
            <li className="nav-item my-2">
              <NavLink to="/resources/books" className="nav-link text-white">
                <i className="fs-6 bi bi-book"></i><span className="fs-6 ms-3 d-none d-lg-inline">Resources</span>
              </NavLink>
            </li>
            <li className="nav-item my-2">
              <NavLink to="/contact" className="nav-link text-white">
                <i className="fs-6 bi bi-telephone"></i><span className="fs-6 ms-3 d-none d-lg-inline">Contact</span>
              </NavLink>
            </li>
            <li className="nav-item my-2">
              <NavLink to="/about" className="nav-link text-white">
                <i className="fs-6 bi bi-info-square"></i><span className="fs-6 ms-3 d-none d-lg-inline">About Us</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
}
 
export default Navbar;