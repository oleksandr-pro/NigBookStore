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
        const {title, Pages, Publisher,Path, Price} = this.props.data;
        return (
            <View style ={styles.container}>
               
                <View style={styles.subContainer}>
                    <Text style={styles.priceStyle}>
                        {Price}
                    </Text>
                </View>                              
            </View>
        )

    }

}

export default CustomCardContent;