import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import LoadingIcon from "./LoadingIcon";

function App() {
  const [products, setProducts] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      let response = await axios.get(`/api/product`);
      setProducts(response.data);
      setLoading(false);
    };
    getProducts();
  }, []);

  const renderProduct = (product) => {
    const id = product._id;
    async function handleDelete() {
      await axios.delete(`/api/product/${id}`);
      const array = products.filter((item) => item._id !== id);
      setProducts(array);
    }

    return (
      <center key={product._id}>
        <div className="card" style={{ width: "18rem", marginTop: "10px" }}>
          <div className="card-body">
            <h5 className="card-title text-dark">{product.name}</h5>
            <p className="card-text text-body">{product.description}</p>
            <Link to={`/product/${id}`}>
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/product", {
        name,
        description,
      });
      setName("");
      setDescription("");
      setProducts((oldArray) => [...oldArray, response.data.product]);
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return <LoadingIcon />;
  }
  return (
    <>
      <div className="container p-4 text-center bg-dark text-white">
        <h2>MERN App</h2>
      </div>
      <div className="container p-2 my-3 border">
        <h4>Add Product</h4>
        <div className="row">
          <div className="col">
            <form onSubmit={handleSubmit}>
              <input
                className="form-control"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                type="text"
                placeholder="enter name"
                name="name"
                required
              />
              <input
                className="form-control"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                value={description}
                type="text"
                placeholder="enter description"
                name="description"
                required
              />
              <button className="btn btn-success py-0" type="submit">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container p-4 my-3 bg-primary text-white">
        <h4 className="text-center">List of added products</h4>

        {products && products.length > 0 ? (
          products.map((product) => renderProduct(product))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </>
  );
}

export default App;
