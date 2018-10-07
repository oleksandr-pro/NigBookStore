/* @flow */
import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as COLOR from "../../config/colors";
import PropTypes from "prop-types";

import { LoginButton,AccessToken,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "fff",
      password: "12345",
      securePassword: true
    };
  } // constructor

 //Create response callback.
 _responseInfoCallback = (error, result) => {
  if (error) {
    alert('Error fetching data: ' + error.toString());
  } else {
    console.log('result', result);
    let user = {
      username: result.name,
      userFBid: result.id,
      email: result.email,
      picture: result.picture.data.url,
    }
    this.login(user,this.loginFailed )
  }
}
  login = (user, callback) => {
    this.props.login(user, callback);
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
              {username:this.state.username,
               password:this.state.password,},
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

        <View style={{ backgroundColor: '#425bb4',width:200, height:40, flexDirection:'row', display:'none',
          justifyContent:'center',
          alignItems:'center' }}>
          
          <LoginButton
            publishPermissions={["publish_actions"]}
            onLoginFinished={
              (error, result) => {
                if (error) {
                  this.login("test","12345", "test.com", "http://placehold.jp/3d4070/ffffff/150x150.png?css=%7B%22border-radius%22%3A%2215px%22%7D",this.loginFailed )
                 console.log ("login has error: " + error);
                } else if (result.isCancelled) {
                  alert("login is cancelled.");
                } else {
                  AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      const infoRequest = new GraphRequest(
                        '/me?fields=name,picture,email,id',
                        null,
                        this._responseInfoCallback
                      );
                      // Start the graph request.
                      new GraphRequestManager().addRequest(infoRequest).start();
                    }
                  );
                }
              }
            }
            onLogoutFinished={() => alert("logout.")}/>
        </View>

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
  error: PropTypes.array.isRequired,
  navigate: PropTypes.func.isRequired
};

export default LoginView;
