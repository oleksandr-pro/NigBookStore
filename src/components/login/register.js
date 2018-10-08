/* @flow */
import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as COLOR from "../../config/colors";
import PayModalProgress from '../common/payloading';
import * as registerActions from '../../services/actions/register';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: "",
      emailInput: "",
      passwordInput: "",
      securePassword: true,
      loading:false,
    };
  } // constructor

  register(){
    let {usernameInput, emailInput, passwordInput} = this.state;
    if (usernameInput===""||emailInput===""||passwordInput==="") return null;
    let user = {
      name:usernameInput,
      mail:emailInput,
      pass:passwordInput
    }

    this.props.actions.register(user,this.startRegister)
  }

  startRegister=(flag)=>{
    console.log('flag', flag);
      if (!flag){
        return this.registerFailed()
      } else {
        return this.registerSuccess();
      }
  }

  registerFailed(){
    return Alert.alert(
      "Registration Failed",
      `Please input correct values.`,
      [{ text: "OK", onPress: () => null }],
      { cancelable: true }
    );
  }

  registerSuccess(){
    return Alert.alert(
      "Successfully registered",
      `Please check your email`,
      [{ text: "OK", onPress: () => null }],
      { cancelable: true }
    );
  }

  render() {
    return (
      <View
        style={{
          padding: 16,
          margin: 16
        }}
      >
        <PayModalProgress isVisible={this.props.payRequest} />
        <View
          style={{
            marginBottom: 4
          }}
        >
          <Text
            style={{
              color: COLOR.PRIMARY_TEXT_LIGHT,
              fontSize: 12,
              fontWeight: "bold"
            }}
          >
            {`USERNAME`}
          </Text>
          <TextInput
            style={{ height: 36, color: COLOR.PRIMARY_TEXT_LIGHT }}
            underlineColorAndroid={COLOR.PRIMARY_TEXT_LIGHT}
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor={COLOR.PLACEHOLDER_TEXT_LIGHT}
            onChangeText={usernameInput => this.setState({ usernameInput })}
            value={this.state.usernameInput}
            placeholder="user"
          />
        </View>

        <View
          style={{
            marginBottom: 4
          }}
        >
          <Text
            style={{
              color: COLOR.PRIMARY_TEXT_LIGHT,
              fontSize: 12,
              fontWeight: "bold"
            }}
          >
            {`EMAIL`}
          </Text>
          <TextInput
            style={{ height: 36, color: COLOR.PRIMARY_TEXT_LIGHT }}
            underlineColorAndroid={COLOR.PRIMARY_TEXT_LIGHT}
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor={COLOR.PLACEHOLDER_TEXT_LIGHT}
            onChangeText={emailInput => this.setState({ emailInput })}
            value={this.state.emailInput}
            placeholder="email@domain.com"
          />
        </View>

        <View
          style={{
            marginBottom: 16
          }}
        >
          <Text
            style={{
              color: COLOR.PRIMARY_TEXT_LIGHT,
              fontSize: 12,
              fontWeight: "bold"
            }}
          >
            {`PASSWORD`}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={{ height: 36, flex: 1, color: COLOR.PRIMARY_TEXT_LIGHT }}
              underlineColorAndroid={COLOR.PRIMARY_TEXT_LIGHT}
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor={COLOR.PLACEHOLDER_TEXT_LIGHT}
              onChangeText={passwordInput => this.setState({ passwordInput })}
              placeholder="********"
              value={this.state.passwordInput}
              secureTextEntry={this.state.securePassword}
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
                  <Icon name="eye" size={24} color={COLOR.ICON} />
                ) : (
                  <Icon name="eye-off" size={24} color={COLOR.ICON} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.5} onPress={()=> this.register()}>
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
              REGISTER
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  } // render
} // RegisterView

const mapStateToProps = state => ({
  register:state.register,
  common:state.common
})
const mapDispatchToProps = dispatch => ({
  actions:bindActionCreators(registerActions, dispatch)
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterView);
