/* @flow */
import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as COLOR from "../../config/colors";
import PropTypes from "prop-types";

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      securePassword: true
    };
  } // constructor

  login = (username, password, callback) => {
    this.props.login(username, password, callback);
  };

  loginFailed = () => {
    return Alert.alert(
      "Authentication Failed",
      "Incorrect username/password",
      [{ text: "OK", onPress: () => null }],
      { cancelable: true }
    );
  };

  render() {
    return (
      <View
        style={{
          padding: 32,
          margin: 32,
          borderRadius: 4,
          backgroundColor: COLOR.CARD
        }}
      >
        <View
          style={{
            backgroundColor: COLOR.INPUT_TEXT_BACKGROUND,
            marginBottom: 8,
            flexDirection: "row"
          }}
        >
          <View
            style={{
              width: 32,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Icon name="account" size={21} color={COLOR.PRIMARY_TEXT} />
          </View>

          <TextInput
            ref="usernameInput"
            underlineColorAndroid={COLOR.INPUT_TEXT_BACKGROUND}
            style={{
              padding: 8,
              height: 40,
              flex: 1
            }}
            onFocus={() => this.props.setHideLogo(true)}
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
            placeholder="Username"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => this.refs.passwordInput.focus()}
          />
        </View>

        <View
          style={{
            backgroundColor: COLOR.INPUT_TEXT_BACKGROUND,
            marginBottom: 8,
            flexDirection: "row"
          }}
        >
          <View
            style={{
              width: 32,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Icon name="lock" size={21} color={COLOR.PRIMARY_TEXT} />
          </View>

          <TextInput
            ref="passwordInput"
            underlineColorAndroid={COLOR.INPUT_TEXT_BACKGROUND}
            style={{
              padding: 8,
              height: 40,
              flex: 1
            }}
            onFocus={() => this.props.setHideLogo(true)}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={this.state.securePassword}
            returnKeyType="done"
            onSubmitEditing={() => {
              this.props.setHideLogo(false);
            }}
          />

          <View
            style={{
              width: 40,
              backgroundColor: COLOR.WHITE,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                this.setState({
                  securePassword: !this.state.securePassword
                });
              }}
            >
              {this.state.securePassword ? (
                <Icon name="eye" size={24} color={COLOR.ICON_DARK} />
              ) : (
                <Icon name="eye-off" size={24} color={COLOR.ICON_DARK} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            this.login(
              this.state.username,
              this.state.password,
              this.loginFailed
            )
          }
        >
          <View
            style={{
              height: 48,
              backgroundColor: COLOR.TINT,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                color: COLOR.BUTTON_TEXT,
                fontWeight: "bold"
              }}
            >
              LOGIN
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginVertical: 16 }}
          onPress={() => this.props.navigate("ForgotPassword")}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              color: COLOR.TINT
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {/* <View style={{ alignItems: "center", height: 36 }}>
          <Text style={{ color: COLOR.ERROR_TEXT }}>{this.props.error}</Text>
        </View> */}
      </View>
    );
  } // render
} // LoginView

LoginView.propTypes = {
  setHideLogo: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired
};

export default LoginView;
