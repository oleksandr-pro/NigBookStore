import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding:20
      },
      innerContainer: {
          flex:1,
          flexDirection:'column',
          justifyContent:'center',
          backgroundColor:'#ffffff'

      },
      buttonContainer: {
          width:50,
          height:20
      },
      buttonText: {
          fontSize:18
      }

});

export default styles;