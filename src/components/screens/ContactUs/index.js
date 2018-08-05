/* @flow */

import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { bindActionCreators } from "redux";
import * as authActions from "../../../actions/authenticate";
import { connect } from "react-redux";

import * as COLOR from "../../../config/colors";
import DownHeaderBar from "../../atoms/DownHeaderBar"
import { Container, Tabs, Tab, ScrollableTab } from 'native-base'
import styles from './styles';

class ContactUs extends Component {
  static navigationOptions = {
    tabBarLabel: "Contact Us",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="email" size={24} color={COLOR.ICON} />
    )
  }; // navigationOptions

  render() {
    return (
      <View
      style={{
        flex: 1,
        backgroundColor: COLOR.BACKGROUND,
        padding:0
      }}
     >
      <View
        style={{
          flex: 1,
          padding:0,
          margin:0,
          flexDirection:'column'
        }}
      >
        <View style={{height:24, marginTop:5}}>
         <DownHeaderBar data={'Contact Us'}/>
        </View>
        <Container>
        <Tabs
          style={{backgroundColor:COLOR.DARK_PRIMARY_COLOR}}
        >
          <Tab
            heading={'Contact Us'}
            textStyle={styles.TabTextStyle}
            tabStyle={styles.TabStyle}
            activeTextStyle={styles.ActiveTextStyle}
            activeTabStyle={styles.ActiveTabStyle}
            
            >
             <Text>View my profile </Text>
            
          </Tab>
              
        </Tabs>
        </Container>

      </View>
    </View>
    );
  } // render
} // Dashboard

export default ContactUs;
