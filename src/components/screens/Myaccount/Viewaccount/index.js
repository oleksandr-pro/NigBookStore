/* @flow */
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as authActions from "../../../../services/actions/authenticate";
import { connect } from "react-redux";
import {Container, Content, Form, Item, Label, Text} from 'native-base';

class ViewAccount extends Component {
  render() {
    const { user=null } = this.props.state.authSession;
    return (
      <Container>
        <Content>
        <Form style={{padding:15}}>
              <Item fixedLabel style={{height:40}}>
                <Label>Username</Label>
                <Text> {user!==null?user.name:null} </Text>
              </Item>
              <Item fixedLabel style={{height:40}}>
                <Label>Email</Label>
                <Text> {user!==null?user.mail:null} </Text>
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
