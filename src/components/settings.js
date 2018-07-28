/* @flow */

import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import * as COLOR from "../config/colors";

class Settings extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Settings",
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
        <Icon name="menu" size={32} color={COLOR.ICON} />
      </TouchableOpacity>
    )
  }); // navigationOptions

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLOR.BACKGROUND
        }}
      >
        <TouchableOpacity
          style={{
            borderBottomColor: COLOR.TINT_DARK,
            borderBottomWidth: 1,
            padding: 16,
            paddingHorizontal: 16
          }}
        >
          <Text style={{ color: COLOR.PRIMARY, fontSize: 18 }}>Settings1</Text>
          <Text style={{ fontSize: 14 }}>Placeholder settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderBottomColor: COLOR.TINT_DARK,
            borderBottomWidth: 1,
            padding: 16,
            paddingHorizontal: 16
          }}
        >
          <Text style={{ color: COLOR.PRIMARY, fontSize: 18 }}>Settings2</Text>
          <Text style={{ fontSize: 14 }}>Placeholder settings</Text>
        </TouchableOpacity>
      </View>
    );
  } // render
} // Settings

export default Settings;
