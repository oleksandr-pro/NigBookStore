/* @flow */

import React, { Component } from "react";
import { View, StatusBar, Platform } from "react-native";
import { MainStack, LoginStack, PayStack } from "../navigation/router";
import { connect } from "react-redux";
import { StyleSheet } from 'react-native';
import {Root} from "native-base";
import ModalProgress from '../components/common/loading';

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
    console.log('auth info', this.props.auth);
    if (this.props.auth.isAuth && this.props.pay.paid) {
      return (     <Root>
        <View style={{ flex: 1 }}>
          {Platform.OS == "ios" && <StatusBar barStyle="light-content" />}
          <MainStack />
          <ModalProgress 
          isVisible={this.props.common.isFetching}
          />
        </View>
        </Root>
      );
    } else if( this.props.auth.isAuth && !this.props.pay.paid){
      return (
        <View style={{flex:1}}>
        <PayStack/>
          <ModalProgress 
          isVisible={this.props.common.isFetching}
          />
        </View>
      )
    }
    
    else {
        return (
          <View style={{ flex: 1 }}>
          {Platform.OS == "ios" && <StatusBar barStyle="light-content" />}
          <LoginStack />
          <ModalProgress 
          isVisible={this.props.common.isFetching}
          />
          </View>
        );
      }
    }
  }
const mapStateToProps = state => ({
  common:state.common,
  pay: state.pay,
  auth:state.authenticate
}) 
export default connect(
  mapStateToProps
)(Main);
