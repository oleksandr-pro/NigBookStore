import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      padding:0 
      },
      closeIconContainer: {
        width:'100%',
        flexDirection:'row',
        alignItems:'flex-end',
        height:30,
        paddingRight:10

      },
      scrollContainer: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      }
      
})

export default styles;