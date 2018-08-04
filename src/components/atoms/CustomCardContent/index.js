import React, { Component } from 'react';
import {
    Text,
    View
  } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from './styles';
import * as COLOR from "../../../config/colors";

class CustomCardContent extends Component {
    constructor(props){
        super(props);
    };

    componentDidMount(){

    }

    render(){
        const {title, Pages, Publisher,Path} = this.props.data;
        return (
            <View style ={styles.container}>
                <View style={styles.conContainer}>
                    <Icon name="file-download" size={17} color={COLOR.DHB_ICON_DARK} style={{top:4, left:5}} />                   
                    <Text  style={[styles.PageNum, {marginLeft:10}]}>{Pages}</Text>                    
                </View>
                <View style={styles.subContainer}>
                    <Text numberOfLines={3} uppercase={false} style={[styles.TextStyle, {paddingRight:2, paddingLeft:2}]}>
                        {title}
                    </Text>
                </View>
                <View style={styles.subContainer}>
                    <Text style={styles.priceStyle}>
                        N 5,000
                    </Text>
                </View>                              
            </View>
        )

    }

}

export default CustomCardContent;