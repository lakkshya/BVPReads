import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
    return (
        <div className="col-lg-6 col-6 my-2">
            <Link to="/resources/books/allbooks" className="text-decoration-none">
                <div className="card">
                    <div className="card-body">
                        <div className="col-12">
                            <h6>{category._id}</h6>
                        </div>
                        <div className="col-12 mt-2">
                            <h4>{category.totalCopies}</h4>
                        </div>
                        <div className="col-12">
                            <span>books available</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default CategoryCard;