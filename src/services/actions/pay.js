
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


export const startPay = (pay, mail, callback) =>
    async(dispatch)=>{
        const createPayRow = await dispatch({
            [FETCH_API]: {
                receiveType:'CREATE_PAY_ROW',
                endpoint: 'api/node',
                method:requestMethod.POST,
                postObj:pay,
                loader:false,
                callback:callback
            }
        });
        
        const payDetail = await dispatch({
            [FETCH_API]: {
              receiveType:'PAYMENT_DETAILS',
              endpoint:'payment-details',
              method:requestMethod.GET,
              postObj:{field_email_value:mail}
            }
          })
          console.log('payDetail', payDetail);
    }