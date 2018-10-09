import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../../../../Themes'
const  styles = StyleSheet.create({
    item: {
        height:45
    },
    txt:{
        fontSize:Fonts.moderateScale(13)
    },
    labelText: {
        fontSize:Fonts.moderateScale(13)
    },
    formCon: {
        height: Metrics.HEIGHT-120,
        padding:15,
    }
});
export default styles