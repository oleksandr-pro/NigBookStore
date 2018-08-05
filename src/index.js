import React, { Component } from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import * as reducers from "./reducers";
import Main from "./components/main";
import { composeWithDevTools } from 'redux-devtools-extension';

// const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
const reducer = combineReducers(reducers);
const store = createStore(
  reducer, composeWithDevTools(applyMiddleware(thunk, logger)) 
);

console.disableYellowBox = true
export default class App extends Component {
  render() {  
      return (
        <Provider store={store}>
          <Main />
        </Provider>
      );  
  }
 
}
