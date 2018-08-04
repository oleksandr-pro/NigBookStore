import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    Icon
  } from 'react-native';
import * as COLOR from "../../../config/colors";

  class BookHeader extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render(){
        return (
            <View>
                <TouchableOpacity
                    style={{
                    marginRight: 16
                    }}    
                >
                    <Icon name="menu" size={32} color={COLOR.ICON} />
                </TouchableOpacity>
            </View>
        );
    }
  }

  export default BookHeader;