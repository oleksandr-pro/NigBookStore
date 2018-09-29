/* @flow */

import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { bindActionCreators } from "redux";
import * as authActions from "../services/actions/authenticate";
import { connect } from "react-redux";
import * as COLOR from "../config/colors";

class ContactUs extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Contact Us",
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
    const { authSession } = this.props.state;
    const {user} = authSession;
    return (
      <View
        style={{
          flex: 1,
          padding: 8,
          backgroundColor: COLOR.BACKGROUND
        }}
      >
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
            user.username
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
)(ContactUs);
