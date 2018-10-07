import {handleActions} from 'redux-actions'
import getDateFormat from '../../utils/get_date_format';
const initState = () => ({
    payDetails:null,
    payData:null,
    paid: null,
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
                if (nPD.getTime()>new Date().getTime()&&parseFloat(amount)===0){
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
            ...action.callback(action.res),
            payData:data
        }
    }
}, initState())