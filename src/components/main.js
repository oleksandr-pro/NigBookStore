/* @flow */

import React, { Component } from "react";
import { View, StatusBar, Platform } from "react-native";

import { MainStack, LoginStack } from "../config/router";

import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import { connect } from "react-redux";

class Main extends Component {
  render() {
    if (this.props.state.isAuth) {
      return (
        <View style={{ flex: 1 }}>
          {Platform.OS == "ios" && <StatusBar barStyle="light-content" />}
          <MainStack />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          {Platform.OS == "ios" && <StatusBar barStyle="light-content" />}
          <LoginStack />
        </View>
      );
    }
  } // render
} // Main

export default connect(
  state => ({ state: state.authenticate }),
  dispatch => ({
    actions: bindActionCreators(authActions, dispatch)
  })
)(Main);
