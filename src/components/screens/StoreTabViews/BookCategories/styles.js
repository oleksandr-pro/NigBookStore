import { StyleSheet } from 'react-native';
import * as DIMEN from "../../../../config/dimens";
import * as COLOR from "../../../../config/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        marginTop:20
      },
     
      flatview: {
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom:10,
        borderRadius: 2,
      },
      name: {
        fontFamily: 'Verdana',
        fontSize: 18
      }
      
})

export default styles;