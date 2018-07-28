import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View
  } from 'react-native';
  import Icon from "react-native-vector-icons/MaterialIcons";

import styles from './styles';
import * as COLOR from "../../../config/colors";

class DownHeaderBar extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render(){
        console.log(this.props.data);
        return (
            <View style ={styles.container}>
               
                <Icon name="apps" size={24} color={COLOR.DHB_ICON_DARK} />
                <Text style={styles.TextStyle}>
                    {this.props.data}
                </Text>
               
                
            </View>
        );
    }
  }

  export default DownHeaderBar;