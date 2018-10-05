import {handleActions} from 'redux-actions'
import {getDateFormat} from '../../utils/get_date_format';
const initState = () => ({
    payDetails:null,
    paid: false,
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
        const {data} = action.res;
        return {
            ...state,

        }
    }
}, initState())