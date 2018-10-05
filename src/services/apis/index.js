import {create} from 'apisauce';
import {apiHost} from '../../config/global';
const host = apiHost;
const api = create({baseURL:host, timeout: 10000});
export const requestMethod = {
    GET:0,
    POST:1
}
export async function sendRequest(endpoint, method, postObj=null, st=null ){
    let body = null;
    const getParams = {
        headers: {
            'Content-Type':'application/json',
            ...st!==null?{ Authorization: st } : undefined
        }
    }
    const postParams = {
        headers: {
            'Content-Type': 'application/json',
            ...st!==null?{ Authorization: st } : undefined
        },
    }
    console.log('postParams', postParams);
    switch(method){
        case requestMethod.GET:
            if (postObj!==null){
                body = encodeQueryData(postObj);
                endpoint = `${endpoint}?${body}`;
            }
            console.log('endpoint', endpoint);
            api.setHeaders(getParams.headers);
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
                console.log('body', body);
            }
            api.setHeaders(postParams.headers);
            console.log('api', api);
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

function encodeQueryData(data) {
    let ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
 }