/* @flow */

import React, { Component } from "react";
import { View, StatusBar, Platform } from "react-native";

import { MainStack, LoginStack } from "../config/router";

import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import { connect } from "react-redux";
import AppIntroSlider from 'react-native-app-intro-slider';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
  }
});
const slides = [
  {
    key: 'somethun',
    title: 'Our Misson',
    text: 'Our mission is to provide free channels through which Nigerians can access information and learning tools to acquire knowledge.',
    image: require('../assets/2.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun-dos',
    title: 'Our Vision',
    text: 'ZODML\'s vision is a Nigeria in which everyone has the ability to educate themselves.',
    image: require('../assets/1.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun1',
    title: 'App section',
    text: 'This will be based on how to use the app Different section in the app.',
    image: require('../assets/3.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#22bcb5',
  }
];

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      showRealApp: true
    }
  }

  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }
  render() {
    if (this.props.state.isAuth) {
      return (
        <View style={{ flex: 1 }}>
          {Platform.OS == "ios" && <StatusBar barStyle="light-content" />}
          <MainStack />
        </View>
      );
    } else {
      if (this.state.showRealApp) {
        return (
          <View style={{ flex: 1 }}>
          {Platform.OS == "ios" && <StatusBar barStyle="light-content" />}
          <LoginStack />
          </View>
        );
      } else {
        return <AppIntroSlider slides={slides} onDone={this._onDone}/>;
      }
      
    }
  } // render
} // Main

export default connect(
  state => ({ state: state.authenticate }),
  dispatch => ({
    actions: bindActionCreators(authActions, dispatch)
  })
)(Main);
