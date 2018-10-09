/* @flow */
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as authActions from "../../../../services/actions/authenticate";
import { connect } from "react-redux";
import {ListView, View} from 'react-native';
import {Container, Content, Form, Item, Label, Text, H3, ListItem, Body, Left, Right, Card, CardItem,} from 'native-base';
import * as payActions from '../../../../services/actions/pay';
import styles from './styles';

const rowHasChanged = (r1, r2) => r1 !== r2;
const ds = new ListView.DataSource({ rowHasChanged });
const THeader = {key:'No', title:'Reference', nextPayDay:'Next payment Date'}

class ViewAccount extends Component {

  componentWillMount(){
    const { authSession } = this.props.auth;
    const {mail} = authSession.user;
    if (this.props.loading){
      this.props.actions.paymentHistory(
        {
          field_email_value: mail
        }
      );
    }
  }

  _renderRow(rowData){
    console.log('rowData', rowData.key)
    return (
      <View style={styles.listCon}>
        <View style={[{width:30}, styles.bordered]}>
          <Text style={styles.txt}>{rowData.key}</Text>
        </View>
        <View style={[{flex:1}, styles.bordered]}>
        <Text style={styles.txt}>{rowData.title}</Text>
        </View>
        <View style={[{flex:1.5}, styles.bordered]}>
        <Text style={styles.txt}>{rowData.nextPayDay}</Text>          
        </View>
      </View>
    )
  }

  render() {
    const { user=null } = this.props.auth.authSession;
    let index = 1;
    const advisedHistory = this.props.paymentHistory.map(i=>({key:index++,...i, nextPayDay:i['Next Payment Date'] }));
    console.log('advised', advisedHistory);
    const dataSource = ds.cloneWithRows([THeader,...advisedHistory]);
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>User Information</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                  <Item fixedLabel style={{height:50}}>
                    <Label style={styles.labelText}>Username</Label>
                    <Text> {user!==null?user.name:null} </Text>
                  </Item>
                  <Item fixedLabel style={{height:50}}>
                    <Label style={styles.labelText}>Email</Label>
                    <Text> {user!==null?user.mail:null} </Text>
                  </Item>
              </Body>
            </CardItem>
            <CardItem header bordered>
              <Text>Transaction History</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <ListView
                  contentContainerStyle={styles.mainView}
                  dataSource={
                      dataSource
                  }
                  renderRow={this._renderRow.bind(this)}
                  enableEmptySections
                  pageSize={4}
              />
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  } // render
} // Profile

export default connect(
  state => ({ 
    auth: state.authenticate,
    paymentHistory: state.pay.paymentHistory,
    loading: state.pay.loading
  }),
  dispatch => ({
    actions: bindActionCreators(payActions, dispatch)
  })
)(ViewAccount);
