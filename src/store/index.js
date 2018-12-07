import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./reducers";

export default baseState => {
  const initialState = {
    steps: [],
    ...baseState
  };

  const reducer = (state, action) =>
    reducers[action.type] ? reducers[action.type](state, action) : state;
  const middlewares = [thunk];

  if (process.env.NODE_ENV === "development") {
    middlewares.push(
      createLogger({
        collapsed: true
      })
    );
  }

  return createStore(reducer, initialState, applyMiddleware(...middlewares));
};
