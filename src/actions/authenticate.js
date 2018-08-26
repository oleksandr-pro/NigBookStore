/* @flow */

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  RESTORE_SESSION,
  VERIFY_TOKEN,
} from "../config/redux-events";

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
        dispatch(loginSuccess(session));
        //dispatch(loginFailed("Authentication Failed"));
      })
      .catch(error => {callback(); dispatch(loginFailed("Network Error"))});

    // =======================================================


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

function verifyToken(session) {
  return {
    type: VERIFY_TOKEN,
    data: {
      session
    }
  }
}

export function logout() {
  console.log("authenticate:logout");
  return { type: LOGOUT_SUCCESS };
} // logout

export function restoreSession(session) {

  const {token} = session;
  console.log("verify-token",token);
  return dispatch => {
    dispatch (loginRequest());

    fetch(`https://zacsbooks.com/api/user/token.json`, {
      headers: {'Content-Type':'application/json'},
      method:'GET',
      body: JSON.stringify({'token':token})
    }).then(response => response.json())
    .then(responseJson => {
      //validate responseJson'
      console.log('response from verify token', responseJson);
      dispatch(loginSuccess(session));
      //dispatch(loginFailed("Authentication Failed"));
    })
    .catch(error => {
      dispatch(loginFailed("Network Error"))});
  }

} // restoreSession
