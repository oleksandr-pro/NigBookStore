/* @flow */

import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { HomeTabs } from "../config/router";

import Icon from "react-native-vector-icons/MaterialIcons";

import { bindActionCreators } from "redux";
import * as screenTrackActions from "../actions/screen-tracking";
import { connect } from "react-redux";
import getCurrentRouteName from "../utils/get-current-route";

import * as COLOR from "../config/colors";

class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Zacsbooks",
    headerTintColor: COLOR.HEADER_TINT,
    headerStyle: {
      backgroundColor: COLOR.HEADER
    },
    headerRight: (
      <View style={{flex:1, flexDirection:'row'}}>
      <TouchableOpacity
        style={{
          marginRight: 16
        }}
        
      >
        <Icon name="search" size={32} color={COLOR.ICON} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginRight: 16
        }}
        onPress={() => navigation.navigate("DrawerOpen")}
      >
        <Icon name="menu" size={32} color={COLOR.ICON} />
      </TouchableOpacity>
      
      
      </View>
      
    )
  }); // navigationOptions

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLOR.BACKGROUND_GRAY
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: COLOR.BACKGROUND_GRAY
          }}
        >
          <HomeTabs
            screenProps={this.props.navigation}
            onNavigationStateChange={(prevState, currentState) => {
              const currentTab = getCurrentRouteName(currentState);
              const prevScreen = getCurrentRouteName(prevState);

              if (prevScreen !== currentTab) {
                this.props.actions.setTab(currentTab);
              }
            }}
          />
        </View>
      </View>
    );
  } // render
} // Home

export default connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators(Object.assign({}, screenTrackActions), dispatch)
  })
)(Home);
