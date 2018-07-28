import { StyleSheet } from 'react-native';
import * as DIMEN from "../../../config/dimens";
import * as COLOR from "../../../config/colors";

const styles = StyleSheet.create({
    btgContainer: {
        backgroundColor:COLOR.BTG_INACTIVE,
        height:DIMEN.upbuttonHeight,
        margin:0,
        padding:0,

    },
    btgSelected:{
        backgroundColor:COLOR.BTG_ACTIVE,
    },
    btgText:{
        color:COLOR.BTG_TEXT_COLOR
    },
    btgSelectedText:{
        color:COLOR.BTG_TEXT_COLOR
    }
})

export default styles;