/* @flow */

import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  AsyncStorage
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as COLOR from "../config/colors";

import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import { connect } from "react-redux";

import LoginView from "./login/login";
import RegisterView from "./login/register";
import ModalProgress from "./common/loading";
import { CARD } from "../config/colors";

import { DATA_SESSION } from "../config/global";

class Login extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return { title: "Login", header: null };
  }; // navigationOptions

  constructor(props) {
    super(props);
    this.state = {
      hideLogo: false,
      showLogin: true,
      initializing: true
    };
  } // constructor

  componentWillMount() {
    // recover previous data
    setTimeout(() => {
      AsyncStorage.getItem(DATA_SESSION)
        .then(value => {
          if (value) {
            session = JSON.parse(value);
            this.props.actions.restoreSession(session);
          } else {
            this.setState({ initializing: false });
          }
        })
        .done();
    }, 1000);
  }

  _setHideLogo = value => {
    this.setState({ hideLogo: value });
  };

  // render buttons for switching between login and register
  renderViewSwitch = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end"
        }}
      >
        <TouchableOpacity
          disabled={this.state.showLogin}
          onPress={() => this.setState({ showLogin: true })}
        >
          <Text
            style={{
              color: this.state.showLogin ? COLOR.TRANSPARENT : COLOR.TINT
            }}
          >
            LOGIN
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginHorizontal: 8,
            borderRightWidth: 1,
            borderRightColor: COLOR.PRIMARY_TEXT_LIGHT
          }}
        />

        <TouchableOpacity
          disabled={!this.state.showLogin}
          onPress={() => this.setState({ showLogin: false })}
        >
          <Text
            style={{
              color: this.state.showLogin ? COLOR.TINT : COLOR.TRANSPARENT
            }}
          >
            REGISTER
          </Text>
        </TouchableOpacity>
      </View>
    );
  }; // renderViewSwitch

  renderLogo = () => {
    // if current view is register or if keyboard is present show small logo
    if (this.state.hideLogo || !this.state.showLogin) {
      // show small logo
      return (
        <View
          style={{
            marginTop: 16,
            marginHorizontal: 32,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Image
            style={{ height: 45, width: 161 }}
            source={require("../assets/img/logo.png")}
          />

          <View>{this.renderViewSwitch()}</View>
        </View>
      );
    } else {
      // show large logo
      return (
        <View style={{ flex: 0.75 }}>
          <View
            style={{
              marginTop: 16,
              marginHorizontal: 32
            }}
          >
            {this.renderViewSwitch()}
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              style={{ width: 256 }}
              resizeMode="contain"
              source={require("../assets/img/logo.png")}
            />
          </View>
        </View>
      );
    }
  }; // renderLogo

  render() {
    // if loading show splash
    if (this.state.initializing) {
      return (
        <View
          style={{
            flex: 1,

            backgroundColor: COLOR.HEADER
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              style={{ width: 256 }}
              resizeMode="contain"
              source={require("../assets/img/logo.png")}
            />
          </View>
        </View>
      );
    }

    // conditional login/register view
    return (
      <View
        style={{
          flex: 1,
          paddingTop: 16,
          backgroundColor: COLOR.HEADER
        }}
      >
        <ModalProgress isVisible={this.props.state.requestingAuth} />
        {this.renderLogo()}
        {this.state.showLogin ? (
          <LoginView
            setHideLogo={value => this._setHideLogo(value)}
            login={(username, password, callback) => {
              this.props.actions.login(username, password, callback);
            }}
            error={this.props.state.authError}
            navigate={route => this.props.navigation.navigate(route)}
          />
        ) : (
          <RegisterView />
        )}
      </View>
    );
  } // render
} // Login

export default connect(
  state => ({ state: state.authenticate }),
  dispatch => ({
    actions: bindActionCreators(authActions, dispatch)
  })
)(Login);
