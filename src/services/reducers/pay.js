import {handleActions} from 'redux-actions'
const initState = () => ({
    payDetails:null
})

export default handleActions({
    PAYMENT_DETAILS (state, action) {  
        console.log('pay detail', action.res);
        return {
            ...state
        }      
    }
}, initState())