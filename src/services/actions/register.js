
import {FETCH_API} from '../middleware/api-middleware';
import {requestMethod} from '../apis';

export const register = (user,callback, )=>
    async(dispatch)=> {
        dispatch(saveBauth(user));
        const res = await dispatch({
            [FETCH_API]: {
            receiveType: 'REGISTER_SUCCESS',
            endpoint:'api/user/register',
            method: requestMethod.POST,
            shouldAuth:false,
            postObj:user,
            callback
            }
        });
        console.log('res', res);
    }

export const saveBauth = (data) => {
    return {
        type:'SAVE_BAUTH',
        data
    }
}
