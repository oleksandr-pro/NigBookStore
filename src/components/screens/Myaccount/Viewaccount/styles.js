import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../../../../Themes'
const styles = StyleSheet.create({
    bordered: {
        borderColor:Colors.lightGray,
        borderWidth: 1,
        alignItems:'center',
        justifyContent:'center'
    },
    listCon: {
        flexDirection:'row',
        height:50,
        width: Metrics.WIDTH*0.85
    },
    mainView: {
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },
    txt:{
        fontSize:Fonts.moderateScale(13)
    },
    labelText: {
        fontSize:Fonts.moderateScale(13)
    }
});
export default styles