/* @flow */

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as authActions from "../../../../services/actions/authenticate";
import { connect } from "react-redux";
import {Alert} from 'react-native';
import {Container, Content, Form, Item, Label, Text, Input, Button} from 'native-base';
import {validateName, validateEmail, validateConfirmPassword} from '../../../../utils/validation'
import * as profileActions from '../../../../services/actions/profile';
import styles from './styles';

class EditAccount extends Component {
     constructor(){
         super()
         this.state = {
            name:'',
            mail:'',
            password:'',
            isLoading:false,
            uid:''
         }
     }

    componentDidMount(){
        const { user } = this.props.auth.authSession;
        let {mail, name} = user;
        this.setState({name:name, mail:mail})
    }

    afterUpdate = (status, message) => {
      console.log('message', message);
      if (status) {
        Alert.alert ("Success", 'Updated Successfully', 
        [{ text: "OK", onPress: () => null }],
        { cancelable: true });
      } else {
        try{
          const err =  message[Object.keys(message)[0]];
          const msg = err.split(';')[0]
          Alert.alert ("Failed", msg, 
          [{ text: "OK", onPress: () => null }],
          { cancelable: true });
        } catch(e) {
          Alert.alert ("Failed", '', 
          [{ text: "OK", onPress: () => null }],
          { cancelable: true });
        }
        
      }
    }

    doUpdate = () => {
      const {name, mail, pass, pass2, current_pass} = this.state;
      const {uid} = this.props.auth.authSession.user;
      const user = {
        name, mail, pass, pass2, current_pass, uid
      };
      this.props.actions.updateProfile(user, this.afterUpdate);
    }
   
  render() {
    const {name, mail, pass, pass2, current_pass} = this.state;
    const notValid = !validateName(name)||!validateEmail(mail)||!validateName(pass)||!validateName(pass2)||!validateName(current_pass)||!validateConfirmPassword(pass, pass2);
    console.log('not valid', notValid);
    return (
      <Container>
        <Content>
          <Form style={styles.formCon}>
              <Item stackedLabel style={styles.item}>
                <Label style={styles.labelText}>Username</Label>
                <Input value={this.state.name} onChangeText={name =>this.setState({name})}/>
              </Item>
              <Item stackedLabel style={styles.item}>
                <Label style={styles.labelText}>Email</Label>
                <Input value={this.state.mail} onChangeText={mail =>this.setState({mail})}/>
              </Item>
              <Item stackedLabel style={styles.item}>
                <Label style={styles.labelText}>New Password</Label>
                <Input value = {this.state.pass} onChangeText={pass =>this.setState({pass})} secureTextEntry={true}/>
              </Item>
              <Item stackedLabel style={styles.item}>
                <Label style={styles.labelText}>Confirm Password</Label>
                <Input value = {this.state.pass2} onChangeText={pass2 =>this.setState({pass2})} secureTextEntry={true}/>
              </Item>
              <Item stackedLabel style={styles.item}>
                <Label style={styles.labelText}>Current Password</Label>
                <Input value = {this.state.current_pass} onChangeText={current_pass =>this.setState({current_pass})} secureTextEntry={true}/>
              </Item>
              <Item style={{borderBottomWidth:0,marginTop:30}}>
              </Item>
              <Button block rounded 
                style={{marginHorizontal:20}} 
                disabled = {notValid}
                onPress={this.doUpdate}
              >
                  <Text style={{textAlign:'center'}}> Submit </Text>
              </Button>
          </Form>

          
          
        </Content>
      </Container>
    );
  } // render
} // Profile

export default connect(
  state => ({ 
    auth: state.authenticate,
    profile: state.profile
    }),
  dispatch => ({
    actions: bindActionCreators(profileActions, dispatch)
  })
)(EditAccount);
