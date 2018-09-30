/* @flow */
import {FETCH_API} from '../middleware/api-middleware';
import {requestMethod} from '../apis';

export const login = (user,callback)=>
  async(dispatch) => {
    console.log('user', user);
    const res = await dispatch({
        [FETCH_API]: {
            receiveType: 'LOGIN_SUCCESS',
            endpoint: 'api/user/login',
            method: requestMethod.POST,
            postObj: user,
            callback
        }
    })
  }

export const logout = () => ({
  type:'LOGOUT_SUCCESS'
})

export const restoreSession = (session) => {
  return ({
    type:'RESTORE_SESSION',
    data: {session}
  })
}
