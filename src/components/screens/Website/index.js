/* @flow */

import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { bindActionCreators } from "redux";
import * as authActions from "../../../actions/authenticate";
import { connect } from "react-redux";

import * as COLOR from "../../../config/colors";

class Website extends Component {
  static navigationOptions = {
    tabBarLabel: "Website"
  }; // navigationOptions

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLOR.BACKGROUND
        }}
      >
        <View
          style={{
            flex: 1,
            marginBottom: 72,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Icon size={96} name="newspaper" color={COLOR.TINT_DARK} />
        </View>
      </View>
    );
  } // render
} // Feed

export default Website;
