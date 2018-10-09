/* @flow */

import React, { Component } from "react";
import { View, TouchableOpacity, AsyncStorage } from "react-native";
import { HomeTabs } from "../navigation/router";
import {Icon } from 'native-base';
import { bindActionCreators } from "redux";
import * as screenTrackActions from "../services/actions/screen-tracking";
import * as bookActions from "../services/actions/books_actions";
import { connect } from "react-redux";
import getCurrentRouteName from "../utils/get-current-route";
import * as COLOR from "../config/colors";
import Data from '../../src/books.json';

class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Zacsbooks",
    headerTintColor: COLOR.HEADER_TINT,
    headerStyle: {
      backgroundColor: COLOR.HEADER
    },
    headerRight: (
      <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        <TouchableOpacity
          style={{
            marginRight: 16
          }} 
          onPress = {() =>navigation.navigate("Search")}       
        >
          <Icon name="search" size={32} style={{color:COLOR.ICON}} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginRight: 16
          }}
          onPress={() => navigation.navigate("DrawerOpen")}
        >
          <Icon name="menu" size={32} style={{color:COLOR.ICON}} />
        </TouchableOpacity>     
      </View>
    )
  }); // navigationOptions

  componentDidMount(){
    AsyncStorage.getItem('data', (err, data) => {
      console.log('It is home', data);
      if (data === null){
          AsyncStorage.setItem('data', JSON.stringify(Data.books));
      }
  });
  }

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
  } 
} 

export default connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators(Object.assign({}, screenTrackActions, bookActions), dispatch)
  })
)(Home);
