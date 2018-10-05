import {create} from 'apisauce';
import {apiHost, psHost} from '../../config/global';

export const requestMethod = {
    GET:0,
    POST:1
}
export async function sendRequest(endpoint, method, postObj=null, st=null, ps=false,pheaders=null ){
    let body = null;
    let getParams = {
        headers: {
            'Content-Type':'application/json',
            ...st!==null?{ Authorization: st } : undefined
        }
    }
    
    getParams.headers = {...getParams.headers,...pheaders!==null?pheaders:undefined}

    let postParams = {
        headers: {
            'Content-Type': 'application/json',
            ...st!==null?{ Authorization: st } : undefined
        },
    }

    postParams.headers = {...postParams.heasers, ...pheaders!==null?pheaders:undefined};

    const host = ps?psHost:apiHost;
    const api = create({baseURL:host, timeout: 10000});
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
    return ret.join('&').replace('%40', '@');
 }