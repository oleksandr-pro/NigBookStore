import {handleActions} from 'redux-actions'

const initState = () => ({
    isFetching:false,
    netError:null
})

export default handleActions ({
    COMMON_REQUEST (state, action) {
        return {
            ...state,
            isFetching:true
        }
    },
    COMMON_RECEIVE (state, action) {
        return {
            ...state,
            isFetching:false,
        }
    },
    COMMON_INIT_STATE (state, action) {
        return {
            ...initState()
        }
    },
    COMMON_NET_ERROR (state, action) {
        return {
            isFetching:false,
            netError: action.err
        }
    }
}, initState())