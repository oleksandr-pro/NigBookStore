/* @flow */

import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as COLOR from "../config/colors";
import { bindActionCreators } from "redux";
import * as authActions from "../services/actions/authenticate";
import * as screenTrackActions from "../services/actions/screen-tracking";
import { connect } from "react-redux";

class DrawerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeSelected: true,
      contactusSelected: false,
      settingsSelected: false
    };
  } // constructor

  render() {
    const { navigation } = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLOR.PRIMARY,
          paddingTop: 40
        }}
      >
        <View style={{ marginVertical: 32, paddingHorizontal: 20 }}>
          <Image
            style={{ height: 45, width: 161 }}
            source={require("../assets/img/logo.png")}
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: COLOR.CARD
          }}
        >
          <TouchableOpacity
            style={{ marginBottom: 24 }}
            onPress={() => {
              this.props.actions.setScreen("Home");
              this.setState({
                homeSelected: true,
                categorySelected: false,
                aboutusSelected: false,
                logoutSelected:false
              });
              navigation.navigate("HomeItem");
            }}
          >
            <View
              style={{
                padding: 16,
                flexDirection: "row",
              }}
            >
              <Icon
                style={{ marginRight: 24 }}
                name="home"
                size={21}
                color={this.state.homeSelected
                  ? COLOR.HEADER
                  : COLOR.SECONDARY_TEXT_COLOR}
              />
              <Text style={{ 
                fontSize: 16,
                fontWeight:'bold', 
                color:this.state.homeSelected
                ? COLOR.HEADER
                : COLOR.SECONDARY_TEXT_COLOR}}>
                Home
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginBottom: 24 }}
            onPress={() => {
              this.props.actions.setScreen("Category");
              this.setState({
                homeSelected: false,
                categorySelected: true,
                aboutusSelected: false,
                logoutSelected:false
              });

              navigation.navigate("CategoryItem");
            }}
          >
            <View
              style={{
                padding: 16,
                flexDirection: "row",
              }}
            >
              <Icon
                style={{ marginRight: 24 }}
                name="view-list"
                size={21}
                color={this.state.categorySelected
                  ? COLOR.HEADER
                  : COLOR.SECONDARY_TEXT_COLOR}
              />
              <Text style={{ 
                fontSize: 16,
                fontWeight:'bold', 
                color:this.state.categorySelected
                ? COLOR.HEADER
                : COLOR.SECONDARY_TEXT_COLOR}}>
                Shop by Category
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginBottom: 18 }}
            onPress={() => {
              this.props.actions.setScreen("AboutUs");
              this.setState({
                homeSelected: false,
                categorySelected: false,
                aboutusSelected: true,
                logoutSelected:false
              });

              navigation.navigate("AboutUsItem");
            }}
          >
            <View
              style={{
                padding: 16,
                flexDirection: "row",
                
              }}
            >
              <Icon
                style={{ marginRight: 24 }}
                name="book"
                size={21}
                color={this.state.aboutusSelected
                  ? COLOR.HEADER
                  : COLOR.SECONDARY_TEXT_COLOR}
              />
              <Text style={{
                fontSize: 16,
                fontWeight:'bold', 
                color:this.state.aboutusSelected
                ? COLOR.HEADER
                : COLOR.SECONDARY_TEXT_COLOR}}>
                About Us
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginBottom: 24, marginTop: 16 }}
            onPress={() => {
              this.props.actions.logout();
              this.setState({
                homeSelected: false,
                categorySelected: false,
                aboutusSelected: false,
                logoutSelected:true
              })
            }}
          >
            <View
              style={{
                padding: 16,
                flexDirection: "row"
              }}
            >
              <Icon
                style={{ marginRight: 24 }}
                name="logout"
                size={21}
                color={this.state.logoutSelected
                  ? COLOR.HEADER
                  : COLOR.SECONDARY_TEXT_COLOR}
              />
              <Text style={{ 
                fontSize: 16,
                fontWeight:'bold', 
                color:this.state.logoutSelected
                ? COLOR.HEADER
                : COLOR.SECONDARY_TEXT_COLOR}}>
                Log out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  } // render
} // DrawerContainer

export default connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators(
      Object.assign({}, authActions, screenTrackActions),
      dispatch
    )
  })
)(DrawerContainer);
