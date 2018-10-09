import {FETCH_API} from '../middleware/api-middleware';
import {requestMethod} from '../apis';

export const getProfile = () => 
    async(dispatch)=> {
        const res = await dispatch({
            [FETCH_API]: {
                receiveType: 'GET_PROFILE',
                endpoint: 'api/user/236.json',
                method: requestMethod.GET,
            }
        })
    }

export const updateProfile = (user, callback) =>
    async(dispatch)=> {
        console.log('callback', callback);
        const res = await dispatch({
            [FETCH_API]: {
                receiveType: 'UPDATE_PROFILE',
                endpoint: `api/user/${user.uid}`,
                method:requestMethod.PUT,
                postObj: user,
                callback
            }
        });
        console.log('updated profile', res);
        try{
            const {name, pass2} = res.res
            if (name){
                const res1 = await dispatch({
                    [FETCH_API]: {
                        receiveType: 'LOGIN_SUCCESS',
                        endpoint: 'api/user/login',
                        method: requestMethod.POST,
                        shouldAuth:false,
                        postObj: {username:name, password:pass2},
                        callback
                    }
                });
            }
            
        }catch(e){
            console.log(failed);
        }
    }