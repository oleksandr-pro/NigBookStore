/* @flow */

import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import ModalProgress from './common/loading';
import * as COLOR from "../config/colors";

class ForgotPassword extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Recover Account",
      headerTintColor: COLOR.HEADER_TINT,
      headerStyle: {
        backgroundColor: COLOR.HEADER
      }
    };
  }; // navigationOptions

  constructor(props) {
    super(props);
    this.state = {
      emailInput: "",
      isLoading:false,
    };
  }

  doResetPassword = ()=> {
    const {emailInput} = this.state;
    return fetch(`https://zacsbooks.com/api/user/request_new_password `, {
        headers: {'Content-Type':'application/json'},
        method:'POST',
        body: JSON.stringify({'name':emailInput})
      }).then(response => response.json())
      .then(responseJson => {
        console.log("response", responseJson);
        if (responseJson[0]===true){
          Alert.alert( "Success",
          'Please check your email and follow instructions to recover password.',
          [{ text: "OK", onPress: () => null }],
          { cancelable: true }
          );
        } else {
          Alert.alert( "Failed",
          'Please input correct value.',
          [{ text: "OK", onPress: () => null }],
          { cancelable: true }
           );}
        }
         
      )
      .catch(error => {
        console.log('failed', error);
        Alert.alert( "Failed",
          'Network error.',
          [{ text: "OK", onPress: () => null }],
          { cancelable: true }
           );
      });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          padding: 8,
          margin: 16,
          marginTop: 16,
          backgroundColor: COLOR.BACKGROUND
        }}
      >
         <ModalProgress isVisible = {this.state.isLoading}/>

        <View
          style={{
            paddingVertical: 16
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: COLOR.PRIMARY,
              fontSize: 24,
              padding: 8
            }}
          >
            Forgot your password?
          </Text>

          <Text style={{ textAlign: "center", padding: 8 }}>
            Enter your email address below and we'll send you instructions on
            how to recover your account
          </Text>

          <TextInput
            style={{
              textAlign: "center",
              height: 36,
              color: COLOR.PRIMARY_TEXT
            }}
            underlineColorAndroid={COLOR.TINT}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={emailInput => this.setState({ emailInput })}
            value={this.state.emailInput}
            placeholder="email@domain.com"
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => this.doResetPassword()}
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
              NEXT
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  } // render
} // ForgotPassword

export default ForgotPassword;
