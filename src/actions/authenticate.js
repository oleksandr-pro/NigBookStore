/* @flow */

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  RESTORE_SESSION
} from "../config/redux-events";

export function login(username, password, callback) {
  console.log("authenticate:login", `${username}:${password}`);
  return dispatch => {
    dispatch(loginRequest());

    // =======================================================

    // const body = {};
    // fetch(uri, {
    //   method: "POST"
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     //validate responseJson'
    //     const session = {};
    //     dispatch(loginSuccess(session));
    //     //dispatch(loginFailed("Authentication Failed"));
    //   })
    //   .catch(error => dispatch(loginFailed("Network Error")));

    // =======================================================

    // FOR TESTING ONLY
    setTimeout(() => {
      if (username == "test" && password == "test") {
        const session = {
          token: "abcd1234",
          username,
          email: "test@nomail.com"
        };
        dispatch(loginSuccess(session));
      } else {
        callback();
        dispatch(loginFailed("Authentication Failed"));
      }
    }, 2000);
  };
} // login

function loginRequest() {
  return {
    type: LOGIN_REQUEST
  };
} //loginRequest

function loginSuccess(session) {
  return {
    type: LOGIN_SUCCESS,
    data: {
      session
    }
  };
} // loginSuccess

function loginFailed(error) {
  if (!error) {
    error = "Network Error";
  }
  return {
    type: LOGIN_FAILED,
    data: {
      error: error
    }
  };
} // loginFailed

export function logout() {
  console.log("authenticate:logout");
  return { type: LOGOUT_SUCCESS };
} // logout

export function restoreSession(session) {
  console.log("authenticate:restoreSession", `${JSON.stringify(session)}`);
  return {
    type: RESTORE_SESSION,
    data: {
      session
    }
  };
} // restoreSession
