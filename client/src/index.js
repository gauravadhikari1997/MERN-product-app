import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useImmerReducer } from "use-immer";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

import "./index.css";

import App from "./App";
import EditProduct from "./EditProduct";

function Main() {
  const initialState = {
    isLoading: true,
    loading: null,
    products: [],
    count: 0,
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "loadingStart":
        draft.loading = true;
        return;
      case "loadingStop":
        draft.loading = false;
        return;
      case "start":
        draft.isLoading = false;
        draft.products = action.value;
        return;
      case "add":
        draft.products.push(action.value);
        draft.isLoading = false;
        return;
      case "delete":
        draft.isLoading = false;
        draft.products = action.value;
        return;
      case "countIncrease":
        draft.count++;
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    const ourRequest = axios.CancelToken.source();

    async function fetchData() {
      try {
        const response = await axios.get(`/api/product`, {
          CancelToken: ourRequest.token,
        });
        dispatch({ type: "start", value: response.data });
      } catch (e) {
        console.log("There was some error", e);
      }
    }
    fetchData();
    return () => {
      ourRequest.cancel();
    };
  }, []);

  useEffect(() => {
    if (state.count) {
      const ourRequest = axios.CancelToken.source();

      async function fetchData() {
        try {
          const response = await axios.get(`/api/product`, {
            CancelToken: ourRequest.token,
          });
          dispatch({ type: "start", value: response.data });
        } catch (e) {
          console.log("There was some error", e);
        }
      }
      fetchData();
      return () => {
        ourRequest.cancel();
      };
    }
  }, [state.count]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <App />
            </Route>
            <Route exact path="/product/:id">
              <EditProduct />
            </Route>
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

ReactDOM.render(<Main />, document.getElementById("root"));
