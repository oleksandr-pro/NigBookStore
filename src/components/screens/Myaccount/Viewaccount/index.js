/* @flow */

import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { bindActionCreators } from "redux";
import * as authActions from "../../../../actions/authenticate";
import { connect } from "react-redux";

import * as COLOR from "../../../../config/colors";

class ViewAccount extends Component {
  
  render() {
    const { user } = this.props.state.authSession;
    return (
      <View
        style={{
          flex: 1,
          padding: 8,
          backgroundColor: COLOR.BACKGROUND,
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center'
        }}
      >
      <View
          style={{
            padding: 16,
            marginBottom: 8
          }}
        >
        </View>
      
        <View
          style={{
            padding: 16,
            marginBottom: 8
          }}
        >
          <Text
            style={{ color: COLOR.PLACEHOLDER_TEXT_LIGHT, fontSize: 14 }}
          >{`Username`}</Text>
          <Text style={{ fontSize: 16, color: COLOR.PRIMARY_TEXT }}>{`${
            user.name
          }`}</Text>
        </View>

        <View
          style={{
            padding: 16,
            marginBottom: 8
          }}
        >
          <Text
            style={{ color: COLOR.PLACEHOLDER_TEXT_LIGHT, fontSize: 14 }}
          >{`Email`}</Text>
          <Text style={{ fontSize: 16, color: COLOR.PRIMARY_TEXT }}>{`${
            user.email
          }`}</Text>
        </View>
      </View>
    );
  } // render
} // Profile

export default connect(
  state => ({ state: state.authenticate }),
  dispatch => ({
    actions: bindActionCreators(authActions, dispatch)
  })
)(ViewAccount);
