import React, { useState, useContext } from "react";
import axios from "axios";
import "./App.css";

import LoadingIcon from "./LoadingIcon";
import Product from "./Product";

import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

function App() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const renderProduct = (product) => {
    async function handleDelete() {
      appDispatch({ type: "loadingStart" });
      await axios.delete(`/api/product/${product._id}`);
      const array = appState.products.filter(
        (item) => item._id !== product._id
      );
      appDispatch({ type: "delete", value: array });
      appDispatch({ type: "loadingStop" });
    }

    return (
      <Product
        key={product._id}
        product={product}
        handleDelete={handleDelete}
      />
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      appDispatch({ type: "loadingStart" });
      const response = await axios.post("/api/product", {
        name,
        description,
      });
      setName("");
      setDescription("");
      appDispatch({ type: "add", value: response.data.product });
      appDispatch({ type: "loadingStop" });
    } catch (e) {
      console.log(e);
    }
  };

  if (appState.isLoading) {
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

        {appState.products && appState.products.length > 0 ? (
          appState.loading ? (
            <LoadingIcon />
          ) : (
            appState.products.map((product) => renderProduct(product))
          )
        ) : (
          <p>No products found</p>
        )}
      </div>
    </>
  );
}

export default App;
