/* @flow */

import { AsyncStorage } from "react-native";
import {
  LOGIN_SUCCESS,
  RESTORE_SESSION,
  SAVE_BAUTH
} from "../redux-events";

import { DATA_SESSION } from "../../config/global";
const base64 = require('base-64');

const initialState = {
  isAuth: false,
  authSession: null,
  authError: [],
  bauth:null
};
export default function authenticate(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const {token=null,} = action.res;
      const {username, password} = action.postObj;
      const bauth = "Basic " + base64.encode(`${username}:${password}`);
      if (token!==null){
        AsyncStorage.setItem(DATA_SESSION, JSON.stringify({...action.res, bauth}));
        return {
          ...state,
          isAuth: true,
          authSession: action.res,
          bauth
        };
      } else {
        action.callback();
        return {
          ...state,
          isAuth: false,
          authError: action.res
        };
      }
    
    case RESTORE_SESSION:
      return {
        isAuth: true,
        authSession: action.data.session,
        bauth:action.data.bauth
      };
    
    case SAVE_BAUTH:
      const{name, pass} = action.data;
      const bauth1 ="Basic " + base64.encode(`${name}:${pass}`); 
      return {
        ...state,
        bauth:bauth1
      }

    default:
      return state;
  }
}
