import React from "react";
import { Link } from "react-router-dom";

function Product(props) {
  const { product, handleDelete } = props;

  return (
    <center>
      <div className="card" style={{ width: "18rem", marginTop: "10px" }}>
        <div className="card-body">
          <h5 className="card-title text-dark">{product.name}</h5>
          <p className="card-text text-body">{product.description}</p>
          <Link to={`/product/${product._id}`}>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary py-0"
            >
              Edit
            </button>
          </Link>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger py-0"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </center>
  );
}

export default Product;
