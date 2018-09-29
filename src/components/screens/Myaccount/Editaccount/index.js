/* @flow */

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as authActions from "../../../../services/actions/authenticate";
import { connect } from "react-redux";
import {Container, Content, Form, Item, Label, Text, Input, Button} from 'native-base';
import ModalProgress from '../../../common/loading';
import * as COLOR from "../../../../config/colors";

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
        const { user } = this.props.state.authSession;
        let {mail, name} = user;
        this.setState({name:name, mail:mail})
    }
    doUpdate = ()=>{
        this.setState({isLoading:true});
        let {name, mail, password, uid} = this.state;
        if (name===''||mail===''||password===''){
            this.setState({isLoading:true});
            return Alert.alert(
                "Not correct",
                "Please fill all fields",
                [{ text: "OK", onPress: () => null }],
                { cancelable: true }
              );
        }
        return fetch(`https://zacsbooks.com/api/user/${uid} `, {
            headers: {'Content-Type':'application/json'},
            method:'POST',
            body: JSON.stringify({'name':name, 'mail':mail, 'pass':password})
            }).then(response => response.json())
            .then(responseJson => {
                console.log('response', responseJson);
                if (responseJson[0]!==true){
                    Alert.alert ("Failed", responseJson[0], 
                    [{ text: "OK", onPress: () => null }],
                    { cancelable: true });
                    const { user } = this.props.state.authSession;
                    let {mail, name} = user;
                    this.setState({name:name, mail:mail})
                } else {
                    Alert.alert ("Success", responseJson[0], 
                    [{ text: "OK", onPress: () => null }],
                    { cancelable: true });
                }
                this.setState({isLoading:false})
            })
            .catch(error=>{console.log('error', error); this.setState({isLoading:false})});
    }
  render() {
    const { user } = this.props.state.authSession;
    return (
      <Container>
        <Content>
        <ModalProgress isVisible={this.state.isLoading} />
        <Form style={{padding:15}}>
              <Item fixedLabel style={{height:40}}>
                <Label>Username</Label>
                <Input value={this.state.name} onChangeText={name =>this.setState({name:name})}/>
              </Item>
              <Item fixedLabel style={{height:40}} >
                <Label>Email</Label>
                <Input value={this.state.mail} onChangeText={mail =>this.setState({mail:mail})}/>
              </Item>
              <Item fixedLabel style={{height:40}}>
                <Label>password</Label>
                <Input value = {this.state.password} onChangeText={password =>this.setState({password:password})} secureTextEntry={true}/>
              </Item>
              <Button block primary style={{ paddingBottom: 4, marginTop:10 }} onPress={this.doUpdate}>
                    <Text> Submit </Text>
                </Button>
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
)(EditAccount);
