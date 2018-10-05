import {handleActions} from 'redux-actions'

const initState = () => ({
    registered: false,
    payRequest: false
})

export default handleActions({
    REGISTER_SUCCESS (state, action) {
        console.log('response', action.res);
        console.log('response', action.err);
        if (action.err!==null&&action.err!==undefined){
           ;
            return {
                ...state,
                registered:false,
                payRequest:false,
                ... action.callback(false)
            }
        } else {
            console.log('flag', action.err);
            return {
                ...state,
                payRequest:true,
            }
        }               
    },
    CREATE_PAY_ROW (state, action) {
        console.log('response', action.res);
        const {nid, uri} = action.res;
        if (action.err!==null&&action.err!==undefined){
            ;
            return {
                ...state,
                registered:false,
                payRequest:false,
                ...action.callback(false)
            }
        }
        return {
            ...state,
            payRequest:false,
            registered: true,
            ...action.callback(true)
        }
    }
}, initState())