
import {FETCH_API} from '../middleware/api-middleware';
import {requestMethod} from '../apis';
import {PS_SECRET_KEY} from '../../config/global';

export const payStackInit = (user,callback)=>
    async(dispatch)=> {
        const res = await dispatch({
            [FETCH_API]: {
            receiveType: 'PAY_STACK_INIT',
            endpoint:'transaction/initialize ',
            method: requestMethod.POST,
            shouldAuth: false,
            ps:true,
            pheaders:{Authorization:`Bearer ${PS_SECRET_KEY}`},
            postObj:user,
            callback
            }
        })
    }