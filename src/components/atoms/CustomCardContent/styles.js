import { StyleSheet } from 'react-native';
import * as COLOR from '../../../config/colors'

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column', 

    },
    ButtonView: {
        top: 40,
        right:18,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },

    ButtonImage: {
        width: 24,
        height: 24,
    },
    TextStyle:{
        color:'#222222',
        justifyContent:'center',
        
        fontSize:13,
        textAlign:'center'
        
        
    },
    subContainer: {
        flex:1,
        flexDirection:'row',
        justifyContent: 'center', alignItems: 'center'
        
    },
    conContainer: {
        flexDirection:'row',
        alignItems:'flex-start'
    },
    pageNum: {
        justifyContent:'center',
        fontSize:12,
        color:'#444444',
        width:'100%',
        textAlign:'center'
    },
    priceStyle: {
        color:COLOR.CARD_PRICE_COLOR,
        fontWeight:'bold',
        fontSize:15,
        textAlign:'center'
    }
    

});

export default styles;
