/* @flow */

import { AsyncStorage } from "react-native";
import {
  LOGIN_SUCCESS,
  RESTORE_SESSION,
} from "../redux-events";

import { DATA_SESSION } from "../../config/global";

const initialState = {
  isAuth: false,
  authSession: null,
  authError: []
};
export default function authenticate(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const {token=null} = action.res;
      if (token!==null){
        AsyncStorage.setItem(DATA_SESSION, JSON.stringify(action.res));
        return {
          ...state,
          isAuth: true,
          authSession: action.res,
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
        authSession: action.data.session
      };

    default:
      return state;
  }
}
