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
            shouldAuth:false,
            postObj: user,
            callback
        }
    });
    console.log('response', res);
    try {
      let {mail} = res.res.user;
      const res1 = await dispatch({
        [FETCH_API]: {
          receiveType:'PAYMENT_DETAILS',
          endpoint:'payment-details',
          method:requestMethod.GET,
          postObj:{field_email_value:mail}
        }
      })
      console.log('response1', res1);
    } catch(err) {
      console.log('error', err);
    }    
  }

export const logout = () => ({
  type:'LOGOUT_SUCCESS'
})

export const restoreSession = (session) =>
  async(dispatch) => {
    dispatch({
      type:'RESTORE_SESSION',
      data: {session}
    })
    const {mail} = session.user;
    const res = await dispatch({
      [FETCH_API]: {
        receiveType: 'PAYMENT_DETAILS',
        endpoint:'payment-details',
        method:requestMethod.GET,
        postObj:{field_email_value:mail}
      }
    });
  }
