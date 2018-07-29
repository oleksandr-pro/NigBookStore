/* @flow */

import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";



import * as COLOR from "../../../../config/colors";

class BookCategories extends Component {
  static navigationOptions = {
    tabBarLabel: "All"
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
          <Icon size={96} name="view-dashboard" color={COLOR.TINT_DARK} />
        </View>
      </View>
    );
  } // render
} // Dashboard

export default BookCategories;
