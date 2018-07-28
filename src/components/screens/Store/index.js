/* @flow */

import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { bindActionCreators } from "redux";
import * as authActions from "../../../actions/authenticate";
import { connect } from "react-redux";

import * as COLOR from "../../../config/colors";
import styles from './styles';

import { ButtonGroup } from 'react-native-elements'; // 0.17.0
import DownHeaderBar from "../../atoms/DownHeaderBar"


class Store extends Component {
  static navigationOptions = {
    tabBarLabel: "Store"
  }; // navigationOptions

  constructor () {
    super()
    this.state = {
      selectedIndex: 4
    }
    this.updateIndex = this.updateIndex.bind(this)
  };

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  };

  render() {
    const buttons = ['Featured', 'New Books','Categories', 'Best Seller','All']
    const { selectedIndex } = this.state
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLOR.BACKGROUND,
          padding:0
        }}
      >
        <View
          style={{
            flex: 1,
            padding:0,
            margin:0,
            flexDirection:'column'
          }}
        >
          <View style={{height:24, marginTop:5}}>
           <DownHeaderBar data={buttons[selectedIndex]}/>
          </View>
          
          
          <ButtonGroup
            style={{padding:0,margin:0}}
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={styles.btgContainer}
            containerBorderRadius = {0}
            selectedButtonStyle = {styles.btgSelected}
            textStyle = {styles.btgText}
            selectedTextStyle = {styles.btgSelectedText}
          />
          
          
        </View>
      </View>
    );
  } // render
} // Dashboard


export default Store;
