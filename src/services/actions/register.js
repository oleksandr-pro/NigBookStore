
import {FETCH_API} from '../middleware/api-middleware';
import {requestMethod} from '../apis';

export const register = (user,callback)=>
    async(dispatch)=> {
        const res = await dispatch({
            [FETCH_API]: {
            receiveType: 'REGISTER_SUCCESS',
            endpoint:'api/user/register',
            method: requestMethod.POST,
            postObj:user,
            callback
            }
        })
    }