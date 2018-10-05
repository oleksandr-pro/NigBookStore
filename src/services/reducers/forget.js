import {handleActions} from 'redux-actions'
const initState = () => ({
    resetPass:false
})

export default handleActions({
    RESET_PASSWORD (state,action){
        if (action.err!==undefined){
            return {
                ...state,
                resetPass:false,
                ...action.callback(false)
            }
        } else {
            return {
                ...state,
                resetPass:true,
                ...action.callback(true)
            }
        }
    }
}, initState())