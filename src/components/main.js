/* @flow */

import React, { Component } from "react";
import { View, StatusBar, Platform } from "react-native";

import { MainStack, LoginStack } from "../config/router";

import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import { connect } from "react-redux";
import AppIntroSlider from 'react-native-app-intro-slider';
import { StyleSheet } from 'react-native';
import {Root} from "native-base";

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  }
});

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      showRealApp: false
    }
  }

  render() {
    if (!this.props.state.isAuth) {
      return (     <Root>
        <View style={{ flex: 1 }}>
          {Platform.OS == "ios" && <StatusBar barStyle="light-content" />}
          <MainStack />
        </View>
        </Root>
      );
    } else {
        return (
          <View style={{ flex: 1 }}>
          {Platform.OS == "ios" && <StatusBar barStyle="light-content" />}
          <LoginStack />
          </View>
        );
      }
      
    }
  } 


export default connect(
  state => ({ state: state.authenticate }),
  dispatch => ({
    actions: bindActionCreators(authActions, dispatch)
  })
)(Main);
