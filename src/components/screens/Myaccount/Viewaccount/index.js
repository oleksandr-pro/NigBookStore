/* @flow */

import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { bindActionCreators } from "redux";
import * as authActions from "../../../../actions/authenticate";
import { connect } from "react-redux";

import {Container, Content, Form, Item, Label, Text} from 'native-base';

import * as COLOR from "../../../../config/colors";

class ViewAccount extends Component {
  
  render() {
    const { user } = this.props.state.authSession;
    return (
      <Container>
        <Content>
        <Form style={{padding:15}}>
              <Item fixedLabel style={{height:40}}>
                <Label>Username</Label>
                <Text> {user.name} </Text>
              </Item>
              <Item fixedLabel style={{height:40}}>
                <Label>Email</Label>
                <Text> {user.mail} </Text>
              </Item>
          </Form>
        </Content>
      </Container>
    );
  } // render
} // Profile

export default connect(
  state => ({ state: state.authenticate }),
  dispatch => ({
    actions: bindActionCreators(authActions, dispatch)
  })
)(ViewAccount);
