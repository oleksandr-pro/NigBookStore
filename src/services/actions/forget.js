
import {FETCH_API} from '../middleware/api-middleware';
import {requestMethod} from '../apis';

export const resetPassword = (user,callback)=>
    async(dispatch)=> {
        const res = await dispatch({
            [FETCH_API]: {
            receiveType: 'RESET_PASSWORD',
            endpoint:'api/user/request_new_password',
            method: requestMethod.POST,
            shouldAuth: false,
            postObj:user,
            callback
            }
        })
    }