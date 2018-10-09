import {handleActions} from 'redux-actions'

const initState = ()=>({
    user:null
});

export default handleActions ({
    GET_PROFILE (state, action) {
        const {uid} = action.res;
        if (uid){
            return {
                ...state,
                user:action.res
            }
        } else  {
            return {
                ...state
            }
        }
    },

    UPDATE_PROFILE (state, action) {
        console.log('action--------', action.res);
        const {uid} = action.res;

        if (uid){
            return {
                ...state,
                ...action.callback(true, action.res)
            }
        } else {
            const {form_errors} = action.res
            return {
                ...state,
                ...action.callback(false, form_errors)
            }
        }
    }
}, initState())
