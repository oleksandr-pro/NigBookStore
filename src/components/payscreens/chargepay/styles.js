import {StyleSheet} from 'react-native';
import {Metrics, Fonts} from '../../../Themes';
const styles = StyleSheet.create({
    fieldInfoTxt: {
        color: "#0e1130",
        fontSize: Fonts.moderateScale(15),
      },
    textInput: {
        backgroundColor: "#fff",
        borderRadius: 5,
            borderColor: '#ffc700',
            borderWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        alignSelf: 'center',
        width: (Metrics.WIDTH * 0.84),
            fontSize: Fonts.moderateScale(15),
            color: "#0e1130",
            marginTop: -5,
    },
    saveCancelBg: {
		flexDirection: 'row',
        width: Metrics.WIDTH * 0.8,
        alignSelf:'center',
		marginLeft: Metrics.WIDTH * 0.03,
		marginRight: Metrics.WIDTH * 0.03,
		marginTop: Metrics.WIDTH * 0.05,
		marginBottom: Metrics.WIDTH * 0.05,
		justifyContent: 'space-between'
    },
    cancelBg: {
		backgroundColor: "#ffc700",
        width: Metrics.WIDTH * 0.38,
        paddingTop: Metrics.HEIGHT * 0.012,
        paddingBottom: Metrics.HEIGHT * 0.012,
        borderRadius: 5,
    },
    footerTxt: {
        color: "#0e1130",
        fontSize: Fonts.moderateScale(15),
        textAlign: 'center'
    },


})

export default styles;