
import {FETCH_API} from '../middleware/api-middleware';
import {requestMethod} from '../apis';

export const register = (user,callback, pay, callback1)=>
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
        const res1 = await dispatch({
            [FETCH_API]: {
                receiveType:'CREATE_PAY_ROW',
                endpoint: 'api/node',
                method:requestMethod.POST,
                postObj:pay,
                loader:false,
                callback:callback1
            }
        });
        console.log('res1',res1);
    }

export const saveBauth = (data) => {
    return {
        type:'SAVE_BAUTH',
        data
    }
}
