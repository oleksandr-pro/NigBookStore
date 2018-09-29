/* @flow */

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  RESTORE_SESSION,
} from "../redux-events";

export function login(username, password, callback) {
  console.log("authenticate:login", `${username}:${password}`);
  return dispatch => {
    dispatch(loginRequest());

    // =======================================================
    const body = {};
    fetch(`https://zacsbooks.com/api/user/login`, {
      headers:{'Content-Type': 'application/json'},
      method: "POST",
      body: JSON.stringify({'username':username, 'password':password})
    })
      .then(response => response.json())
      .then(responseJson => {
        //validate responseJson'
        console.log('response from login', responseJson);
        const session = responseJson;
        const {user} = session;
        
        dispatch(loginSuccess(session));
        //dispatch(loginFailed("Authentication Failed"));
      })
      .catch(error => {callback(); dispatch(loginFailed("Network Error"))});
    // =======================================================


  };
} // login

function paymentStart(){

}

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
