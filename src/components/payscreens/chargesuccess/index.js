import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {Icon} from 'native-base';
import {formatDate, addMonths} from '../../../utils/useful-func';
import * as payActions from '../../../services/actions/pay';
import * as authActions from '../../../services/actions/authenticate';
import * as COLOR from "../../../config/colors";

class ChargeSuccess extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Successfully Charged",
        headerTintColor: COLOR.HEADER_TINT,
        headerStyle: {
          backgroundColor: COLOR.HEADER
        }
      }); // navigationOptions

      constructor(){
          super();
          this.state = {
              paySuccess:false
          }
      }

      componentDidMount(){
          const {paidRef} = this.props.pay;
          const {user} = this.props.auth.authSession;
          const {mail} = user;
          const next = addMonths(1);
          let title = Math.random().toString().slice(2,12);
          let pay = {
            type: 'custom_payment',
            title,
            field_email: {
              und: [
                {
                  value: mail
                }
              ]
            },
            field_next_payment_date:{
                und: [
                    {value: {
                        month:next.getMonth()+1,
                        year:next.getFullYear(),
                        day:next.getDate(),
                        hour:0,
                        minute:0,
                        second:0
                      }
                      }
                  ]
              },
          }
          setTimeout(() => {
            this.props.actions.payVerifyNext(paidRef, pay, this.afterPayVerified);
          }, 300);
      }

      afterPayVerified = (status) => {
          console.log('status', status);
        this.setState({paySuccess:true})
      }

      render() {
        const { authSession } = this.props.auth;
        const {user} = authSession;
        var nextPayDay = addMonths(1);
        const st_nextPayDay = formatDate(nextPayDay);
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
            {this.state.paySuccess?
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
                You have successfully charged the subscription.
                </Text>
    
                <Text style={{ textAlign: "center", padding: 20 }}>
                {`Your next pay day is ${st_nextPayDay}.`}
                </Text>
            </View>
            :null
            }
            {this.state.paySuccess?
            <View style={{flexDirection:'row', flex:1}}>
                <TouchableOpacity
                activeOpacity={0.5}
                onPress={ this.props.actions.payAfterHome}
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
                    Go to home page
                    </Text>
                </View>
                </TouchableOpacity>
            </View>
            :null
            }   
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
  )(ChargeSuccess);