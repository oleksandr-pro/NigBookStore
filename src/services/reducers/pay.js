import {handleActions} from 'redux-actions'
import getDateFormat from '../../utils/get_date_format';
const initState = () => ({
    payDetails:null,
    payData:null,
    paid: null,
    paidRef: null
})

export default handleActions({
    PAYMENT_DETAILS (state, action) {  
        console.log('pay detail', action.res);
        const {nodes} = action.res;
        const {node} = nodes[0];
        if (node!==undefined){
            const amount = node.Amount;
            const nextPayDay = node['Next Payment Date'];
            if (nextPayDay!==''&&amount!==''){
                console.log('nextPayday', nextPayDay);
                const nPD = getDateFormat(nextPayDay);
                if (nPD.getTime()>new Date().getTime()){
                    return {
                        ...state,
                        payDetails:nodes,
                        paid:true
                    }
                }
            }             
        }
        return {
            ...state,
            payDetails:nodes,
            paid:false
        }      
    },
    
    PAY_STACK_INIT(state, action) {
        console.log('pay stack init', action.res);
        const {status, message, data} = action.res;
        return {
            ...state,
            payData:data,
        }
    },

    PAY_STACK_SUCCESS (state, action) {
        console.log('pay stack success', action.res);
        const {reference} = action.res;
        return {
            ...state,
            paidRef: reference,
            ...action.callback(true, reference)
        }
    },

    PAY_STACK_ERROR (state, action) {
        console.log('pay stack error', action.res);
        const {message} = action.res;
        return {
            ...state,
            paidRef: reference,
            ...action.callback(false, message)
        }
    },

    CREATE_NEXT_PAY (state, action) {
        console.log('next pay initializing', action.res);
        return {
            ...state,
            ...action.callback('')
        }
    },

    PAY_AFTER_HOME (state, action) {
        return {
            paid: true
        }
    }

}, initState())