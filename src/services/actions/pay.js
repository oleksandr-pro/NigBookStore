
import {FETCH_API} from '../middleware/api-middleware';
import {requestMethod} from '../apis';
import {PS_SECRET_KEY} from '../../config/global';
import RNPaystack from 'react-native-paystack';

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

export const startPay = (pay, mail, cardInfo, callback) =>
    async(dispatch)=>{
        try{
            const createPayRow = await dispatch({
                [FETCH_API]: {
                    receiveType:'CREATE_PAY_ROW',
                    endpoint: 'api/node',
                    method:requestMethod.POST,
                    postObj:pay,
                }
            });

            console.log('createpayRow', createPayRow);
            
            const payDetail = await dispatch({
                [FETCH_API]: {
                  receiveType:'PAYMENT_DETAILS',
                  endpoint:'payment-details',
                  method:requestMethod.GET,
                  postObj:{field_email_value:mail}
                }
            });

            console.log('payDetail', payDetail);
            const {nodes} = payDetail.res;
            const {node} = nodes[0];
            const {title, Email, Amount} = node;
            let user = {
                reference: title,
                email: Email,
                amount: Amount
            }

            const payStackInit = await dispatch({
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
            const {data, status, message} = payStackInit.res;
            console.log('payStackInit', payStackInit);
            console.log('cardInfo', cardInfo);
            if (status){
                const {access_code} = data;
                RNPaystack.chargeCardWithAccessCode({
                    cardNumber: cardInfo.cardNumber, 
                    expiryMonth: cardInfo.expiryMonth, 
                    expiryYear: cardInfo.expiryYear, 
                    cvc: cardInfo.cvc,
                    accessCode: access_code
                  })
                  .then(response => {
                    console.log('response', response);
                    dispatch({
                        type:'PAY_STACK_SUCCESS',
                        res:response,
                        callback
                    })
                    // do stuff with the token
                  })
                  .catch(error => {
                    console.log('paystack', error.message);
                    dispatch({
                        type:'PAY_STACK_ERROR',
                        res:{message:error.message},
                        callback
                    })
                  })
            } else {
                dispatch({
                    type:'PAY_STACK_ERROR',
                    res: {message},
                    callback
                })
            }
            
            
        } catch(e){
            console.log('error while paying initializing', e);
        }
        
    }

export const payVerifyNext = (paidRef, pay, callback) => 
    async(dispatch) => {
        console.log('pay', pay);
        const createPayRow = await dispatch({
            [FETCH_API]: {
                receiveType:'CREATE_NEXT_PAY',
                endpoint: 'api/node',
                method:requestMethod.POST,
                postObj:pay,
                callback
            }
        });
        console.log('createPayRow', createPayRow);
    }

export const payAfterHome = () => {
    return {
        type: 'PAY_AFTER_HOME'
    }
}

export const paymentHistory = (user) => 
    async(dispatch) => {
        const paymentHistory = await dispatch({
            [FETCH_API]: {
                receiveType: 'PAYMENT_HISTORY',
                endpoint: 'payment-history',
                method: requestMethod.GET,
                postObj:user,
            }
        })
    }
