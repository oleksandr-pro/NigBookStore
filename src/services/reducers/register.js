import {handleActions} from 'redux-actions'

const initState = () => ({
    registered: false,
    payRequest: false
})

export default handleActions({
    REGISTER_SUCCESS (state, action) {
        console.log('response');
        if (action.err!==null){
            action.callback(false);
            return {
                ...state,
            }
        } else {
            action.callback(true);
            return {
                ...state,
                payRequest:true
            }
        }               
    }
}, initState())