import { sendRequest } from '../apis';
var Symbol = require('es6-symbol');

const checkNet = response => {
    const {status} = response;
    if (status>=200&&status<300){
        return response.data;
    } else {
        const error = new Error(response.problem);
        error.response = response;
        error.type = response.problem;
        throw error;
    }
}

export const FETCH_API = Symbol('FETCH_API');

export default store=>next=>action=>{
    if (!action[FETCH_API]) return next(action)
    const {receiveType='', endpoint, method, postObj=null, loader=true, callback=null}=action[FETCH_API];
    const {dispatch} = store;
    loader?dispatch({
        type:'COMMON_REQUEST',
    }):void 0;
    return sendRequest(endpoint, method, postObj)
        .then(res=>{
            dispatch({type:'COMMON_RECEIVE'});
            console.log('response', res);
            return res
        })
        .then(checkNet)
        .then(res=>{
            return dispatch({type:receiveType, res, postObj});
        })
        .catch(err=>{
            console.log('error in the api', err);
            switch(err.type){
                case 'NET_ERROR':
                    return dispatch({
                        type:'COMMON_NET_ERROR',
                        err
                    })
                case 'TIMEOUT_ERROR':
                    return dispatch({
                        type:'COMMON_NET_ERROR',
                        err
                    })
                case 'CLIENT_ERROR':
                    return dispatch({
                        type: receiveType,
                        res: err.response.data,
                        err: 'CLIENT_ERROR',
                        callback
                    })
                default:
                    break;
            }
            
        })
}