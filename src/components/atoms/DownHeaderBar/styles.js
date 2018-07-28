import { StyleSheet } from 'react-native';
import * as COLOR from '../../../config/colors'

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'row',
        paddingLeft:10,

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
        color:COLOR.DHB_TEXT_COLOR,
        marginLeft:10,
        height:24,
        fontWeight:'bold',
        fontSize:17,
        
    }
});

export default styles;
