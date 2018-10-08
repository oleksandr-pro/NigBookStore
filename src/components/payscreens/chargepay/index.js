import React, { Component } from "react";
import { View, Text, TouchableOpacity, Platform, TextInput } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {Icon} from 'native-base';
import styles from './styles';
import * as payActions from '../../../services/actions/pay';
import * as authActions from '../../../services/actions/authenticate';
import * as COLOR from "../../../config/colors";
import {Metrics} from '../../../Themes';
import {validateName} from '../../../utils/validation';

class ChargePay extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Check Out",
        headerTintColor: COLOR.HEADER_TINT,
        headerStyle: {
          backgroundColor: COLOR.HEADER
        },
        headerLeft: (
            <TouchableOpacity
              style={{
                marginRight: 16
              }}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" type="MaterialIcons" size={28} color={'white'} />
            </TouchableOpacity>
          )
      }); // navigationOptions

      constructor(){
          super();
          this.state = {
            cardNumber:'',
            expiryMonth:'',
            expiryYear:'',
            cvc:''
          }
      }

      afterPaid = (res) => {
        const {status, message, data} = res;
        if (status){
          
        } else {
          alert(message);
        }
      }

      startPay = () => {
        const { authSession } = this.props.auth;
        const {user} = authSession;
        const {mail} = user;
        const now = new Date();
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
                      month:now.getMonth()+1,
                      year:now.getFullYear(),
                      day:now.getDate(),
                      hour:0,
                      minute:0,
                      second:0
                    }
                    }
                ]
            },
        }
        this.props.actions.startPay(pay, mail, this.afterPaid)
      }

      render() {
        const { authSession } = this.props.auth;
        const {user} = authSession;
        const {cardNumber, expiryMonth, expiryYear, cvc} = this.state;
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
                <View>
                    <Text style={[styles.fieldInfoTxt, { padding: 10 }]}>
                    Card Number
                    </Text>

                    <TextInput
                    style={styles.textInput}
                    placeholder="Card Number"
                    placeholderTextColor="#959595"
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    keyboardType={Platform.OS == 'ios' ? "number-pad" : "phone-pad"}
                    maxLength={16}
                    value = {cardNumber}
                    onChange = {cardNumber=>this.setState({cardNumber})}
                    />

                    <View style={{ flexDirection: "row" }}>
                    <Text
                        style={[styles.fieldInfoTxt, { padding: 10 }]}                        
                    >
                        Month
                    </Text>
                    <Text
                        style={[
                        styles.fieldInfoTxt,
                        { padding: 10, marginLeft: 30 }
                        ]}                      
                    >
                        Year
                    </Text>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                    <TextInput
                        style={[
                        styles.textInput,
                        {
                            width: Metrics.WIDTH * 0.2,
                            marginLeft: Metrics.WIDTH * 0.03
                        }
                        ]}
                        placeholder="02"
                        placeholderTextColor="#959595"
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        keyboardType={Platform.OS == 'ios' ? "number-pad" : "phone-pad"}
                        maxLength={2}
                        value = {expiryMonth}
                        onChange = {expiryMonth=>this.setState({expiryMonth})}
                    />

                    <TextInput
                        style={[
                        styles.textInput,
                        {
                            width: Metrics.WIDTH * 0.2,
                            marginLeft: Metrics.WIDTH * 0.08
                        }
                        ]}
                        placeholder="22"
                        placeholderTextColor="#959595"
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        keyboardType={Platform.OS == 'ios' ? "number-pad" : "phone-pad"}
                        maxLength={2}
                        value = {expiryYear}
                        onChange = {expiryYear=>this.setState({expiryYear})}
                    />
                    </View>

                    <Text style={[styles.fieldInfoTxt, { padding: 10 }]}>
                    CVV
                    </Text>

                    <TextInput
                    style={styles.textInput}
                    placeholder="CVV"
                    placeholderTextColor="#959595"
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    keyboardType={Platform.OS == 'ios' ? "number-pad" : "phone-pad"}
                    maxLength={4}
                    value = {cvc}
                    onChange = {cvc=>this.setState({cvc})}
                    />

                    <View style={styles.saveCancelBg}>
                    <TouchableOpacity
                        style={styles.cancelBg}
                        onPress={this.props.navigation.goBack}
                    >
                        <Text style={styles.footerTxt}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        disabled = {!validateName(cardNumber)||!validateName(expiryMonth)||!validateName(expiryYear)||!validateName(cvc)}
                        style={styles.cancelBg}
                        onPress={this.startPay}
                    >
                        <Text style={styles.footerTxt}>Pay</Text>
                    </TouchableOpacity>
                    </View>
                </View>
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
  )(ChargePay);