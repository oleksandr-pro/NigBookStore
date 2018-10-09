/* @flow */

import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from './styles';
import { Container, Tabs, Tab, ScrollableTab, Icon } from 'native-base'
import * as COLOR from "../../config/colors";
import DownHeaderBar from "../atoms/DownHeaderBar"
import MyInfinityScroll from "../screens/MyInfinityScroll"

class CShow extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Categories",
    headerTintColor: COLOR.HEADER_TINT,
    headerStyle: {
      backgroundColor: COLOR.HEADER
    },
    headerRight: (
      <TouchableOpacity
        style={{
          marginRight: 16
        }}
        onPress={() => navigation.navigate("DrawerOpen")}
      >
        <Icon name="menu" size={32} style={{color:COLOR.ICON}} />
      </TouchableOpacity>
    )
  }); // navigationOptions

  constructor(){
    super();
    this.state = {
 
    }
  }

  render() {
    const {item} = this.props.navigation.state.params;
    const {title, data_url} = item;
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
           <DownHeaderBar data={title}/>
        </View>
        <Container>
            <MyInfinityScroll dataUrl={data_url} screenProps = {this.props.screenProps}/>
        </Container>
      </View>
    </View>
    );
  } // render
} // Profile
export default CShow;
