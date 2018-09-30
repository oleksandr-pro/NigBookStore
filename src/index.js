import React, { Component } from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import {AsyncStorage} from 'react-native';
import thunk from "redux-thunk";
import logger from "redux-logger";
import * as reducers from "../src/services/reducers";
import Main from "./components/main";
import { composeWithDevTools } from 'redux-devtools-extension';
import { LOGOUT_SUCCESS } from "./services/redux-events";
import { DATA_SESSION} from './config/global';
import api from './services/middleware/api-middleware';

// const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
const reducer = combineReducers(reducers);
const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS){
    AsyncStorage.removeItem(DATA_SESSION);
    state = undefined;
  }
  return reducer(state, action)
}
const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk,api,logger)) 
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
