import { Link } from "react-router-dom";

const ResourceCategoryLaptop = () => {
    return (
        <div className="row">
            <div className="col-12 d-md-flex mt-4 d-none" id="resourceCategory">
                <Link to="/resources/books" className="cat-active me-5">
                    <span>Books</span>
                </Link>
                <a href="/" className="me-5">
                    <span>EBooks</span>
                </a>
                <a href="/" className="me-5">
                    <span>Previous Papers</span>
                </a>
                <a href="/" className="me-5">
                    <span>Syllabus</span>
                </a>
            </div>
        </div>
    );
}

export default ResourceCategoryLaptop;