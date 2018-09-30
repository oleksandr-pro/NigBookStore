import {create} from 'apisauce';
import {apiHost} from '../../config/global';
const host = apiHost;
const api = create({baseURL:host, timeout: 10000});
export const requestMethod = {
    GET:0,
    POST:1
}
export async function sendRequest(endpoint, method, postObj=null ){
    let body = null;
    const getParams = {
        headers: {
            'Accept':'application/json; charset=utf-8',
            'Content-Type':'application/json'
        }
    }
    const postParams = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    switch(method){
        case requestMethod.GET:
            api.setHeaders(getParams);
            return api.get(endpoint).then((res)=>{
                console.log('response', res);
                return res;
            }).catch((e)=>{
                e={error:'Err', ...e}
                return e
            })
        case requestMethod.POST:
            if (postObj!==null){
                body = JSON.stringify(postObj);
            }
            api.setHeaders(postParams);
            return api.post(endpoint, body).then((res)=>{
                console.log('response', res);
                return res;
            }).catch((e)=>{
                e={error:'Err', ...e}
                return e;
            })
        default:
            break;
    }
}