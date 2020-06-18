import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, withRouter } from "react-router-dom";
import axios from "axios";

import DispatchContext from "./DispatchContext";

function Product(props) {
  const appDispatch = useContext(DispatchContext);

  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const ourRequest = axios.CancelToken.source();
    async function getProducts() {
      const response = await axios.get(`/api/product/${id}`, {
        CancelToken: ourRequest.token,
      });
      setName(response.data.product[0].name);
      setDescription(response.data.product[0].description);
    }
    getProducts();
    return () => ourRequest.cancel();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ourRequest = axios.CancelToken.source();
    try {
      await axios.put(
        `/api/product/${id}`,
        {
          name,
          description,
        },
        {
          CancelToken: ourRequest.token,
        }
      );
      appDispatch({ type: "countIncrease" });
      props.history.push("./");
    } catch (e) {
      console.log(e);
    }
    return () => ourRequest.cancel();
  };

  return (
    <>
      <div className="container p-4 text-center bg-dark text-white">
        <Link className="text-decoration-none text-white" to="/">
          <h2>MERN App</h2>
        </Link>
      </div>

      <div className="container p-2 my-3 border">
        <h4>Edit Product</h4>
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
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(Product);
