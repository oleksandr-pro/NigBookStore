import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {Icon} from 'native-base';
import * as payActions from '../../../services/actions/pay';
import * as authActions from '../../../services/actions/authenticate';
import * as COLOR from "../../../config/colors";

class Subscription extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Subscription",
        headerTintColor: COLOR.HEADER_TINT,
        headerStyle: {
          backgroundColor: COLOR.HEADER
        }
      }); // navigationOptions

      doPayInit = () => {
        this.props.navigation.navigate('ChargePay');
      }
      render() {
        const { authSession } = this.props.auth;
        const {user} = authSession;
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
                You will need to renew your subscription?
              </Text>
    
              <Text style={{ textAlign: "center", padding: 20 }}>
              Click Pay to continue or cancel to back to login page
              </Text>
            </View>
            <View style={{flexDirection:'row', flex:1}}>
                <TouchableOpacity
                activeOpacity={0.5}
                onPress={ this.doPayInit}
                style={{flex:1, margin:15}}
                >
                <View
                    style={{
                        height: 48,
                        borderColor: COLOR.TINT,
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth:2,
                        borderRadius:5
                    }}
                >
                    <Text
                    style={{
                        color: COLOR.TINT,
                        fontWeight: "bold"
                    }}
                    >
                    PAY
                    </Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity
                activeOpacity={0.5}
                onPress={ this.props.actions.logout}
                style={{flex:1, margin:15}}
                >
                <View
                    style={{
                    height: 48,
                    borderColor: COLOR.PINKY_RED,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth:2,
                    borderRadius:5
                    }}
                >
                    <Text
                    style={{
                        color: COLOR.PINKY_RED,
                        fontWeight: "bold"
                    }}
                    >
                    CANCEL
                    </Text>
                </View>
                </TouchableOpacity>
            </View>
            
          </View>
        );
      } // render
}

export default connect(
    state => ({ 
      auth: state.authenticate,
      pay: state.pay
    }),
    dispatch => ({
      actions: bindActionCreators(
        Object.assign({}, 
          authActions,
          payActions), 
          dispatch)
    })
  )(Subscription);