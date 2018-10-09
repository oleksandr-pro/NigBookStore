
import { Platform, StyleSheet, Dimensions } from 'react-native';

// Screen Styles
import { Fonts, Metrics, Colors } from '../../../Themes/';

const styles = StyleSheet.create({

listContent: {
	flexDirection: 'row',
	flexWrap: 'wrap',
	alignItems:'flex-start',
	margin: (Metrics.HEIGHT * 0.01)
},

slidesec:{
	height: (Metrics.HEIGHT*0.905),
	position: 'relative',
	backgroundColor: Colors.snow,
},

rowMain:{
	backgroundColor: Colors.snow,
    width: (Metrics.WIDTH * 0.445),
    height: (Metrics.WIDTH * 0.445),
	margin:(Metrics.WIDTH * 0.0165),
	borderRadius:2,
    alignItems:'center',
    justifyContent:'center',
	alignContent:'flex-start',
	elevation: 5,
	shadowColor: Colors.black,
	shadowOpacity: 0.2,
	shadowRadius: 2,
	shadowOffset: {
		height: (Metrics.HEIGHT) * 0.002,
		width: 0,
	},
},

rowConTitle: {
	margin: (Metrics.WIDTH * 0.03),
	justifyContent: 'space-between'
},
rowTitle: {
    color: '#6f6f6f',
    fontWeight:'bold',
	fontSize: Fonts.moderateScale(15),
	textAlign: 'center'
},
rowLocation: {
	flexDirection: 'row',
	marginTop: (Metrics.HEIGHT * 0.01),
	alignItems: 'center'
},

});

export default styles;
