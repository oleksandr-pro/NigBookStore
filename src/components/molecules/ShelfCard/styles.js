import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor:'transparent'
      },
      innerContainer: {
          
          flex:1,
          flexDirection:'column',
          justifyContent:'center',
          backgroundColor:'#ffffff'

      },
      colCenter:{
        flexDirection:'column',justifyContent:'center', alignItems:'center'
      },
      titleText:{
          fontSize:14
      },
      CloseIconContainer: {
          width:'100%',
          flexDirection:'row',
          alignItems:'flex-end',

      },
      buttonText: {
          fontSize:18
      },
      CardStyle:{
        borderWidth: 0.5,
        borderBottomWidth: 1,
        // borderLeftColor: '#008000',
        borderLeftWidth: 10,
        borderRightWidth:2,
        backgroundColor: 'white',
        // borderColor: '#DCDCDC',
        // borderRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderTopColor: '#DCDCDC',
        borderBottomColor: '#DCDCDC',
        borderLeftColor: '#008000',
        borderRightColor: '#DCDCDC',
      }

});

export default styles;