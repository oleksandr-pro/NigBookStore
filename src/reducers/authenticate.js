/* @flow */

import { AsyncStorage } from "react-native";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  RESTORE_SESSION,
} from "../config/redux-events";

import { DATA_SESSION } from "../config/global";
import { LoginManager} from 'react-native-fbsdk';

const initialState = {
  isAuth: false,
  requestingAuth: false,
  authSession: null,
  authError: ""
};


export default function authenticate(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        authError: "",
        requestingAuth: true
      };
    case LOGIN_SUCCESS:
      AsyncStorage.setItem(DATA_SESSION, JSON.stringify(action.data.session));
      return {
        ...state,
        isAuth: true,
        authSession: action.data.session,
        requestingAuth: false
      };
    case LOGIN_FAILED:
      return {
        ...state,
        requestingAuth: false,
        authError: action.data.error
      };
    case LOGOUT_SUCCESS:
      LoginManager.logOut();
      AsyncStorage.removeItem(DATA_SESSION);
      return {
        ...state,
        isAuth: false,
        requestingAuth: false,
        authSession: null,
        authError: ""
      };
    case RESTORE_SESSION:
      return {
        isAuth: true,
        authSession: action.data.session
      };

    default:
      return state;
  }
}
