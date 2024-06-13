import { NavLink } from "react-router-dom";

const ResourceCategoryPhone = () => {
    function updateDropdown(selectedItem) {
        document.querySelector('.dropdown-toggle').textContent = selectedItem;
    }

    return (
        <div className="row">
            <div className="col-12 d-flex d-md-none mt-4 dropdown">
                <NavLink className="btn btn-dark dropdown-toggle" to="/" role="button" id="dropdownMenuLink"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    Books
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><NavLink className="dropdown-item" to="/resources/books"
                        onClick={() => updateDropdown('Books')}>Books</NavLink></li>
                    <li><a className="dropdown-item" href="/resources/ebooks" onClick={() => updateDropdown('EBooks')}>EBooks</a></li>
                    <li><NavLink className="dropdown-item" to="/resources/previouspapers" onClick={() => updateDropdown('Previous Papers')}>Previous
                        Papers</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/resources/syllabus" onClick={() => updateDropdown('Syllabus')}>Syllabus</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default ResourceCategoryPhone;