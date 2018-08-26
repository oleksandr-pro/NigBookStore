import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Item, Input } from 'native-base';
import MyInfinityScroll from '../MyInfinityScroll'
export default class Search extends Component {
    constructor(){
        super();
        this.state = {
            keyword:'',
            search:false,
        }
    }
    doSearch =()=>{
        
        if (this.state.keyword!==''&&this.state.keyword!==undefined){
            this.setState({search:true})
        } else {this.setState({search:false})}
    }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor:'white'}}>
            <Left>
                <Button transparent onPress={()=> this.props.navigation.goBack()} small>
                    <Icon style={{color:'black'}}  name="arrow-back"/>
                </Button>

            </Left>
          
                <Item style={{flex:1}}>
                    <Icon name="ios-search" />
                    <Input placeholder="Search" onChangeText={keyword => this.setState({ keyword })}/>
                </Item>


                <Button transparent icon small onPress={this.doSearch}>
                    <Icon style={{color:'black'}} type="Feather" name="check"/>
                </Button>

        </Header>
        <Content>
        {this.state.search===true
        ? <MyInfinityScroll dataUrl={`search_api?node_field_category=All&title=${this.state.keyword}`} screenProps = {this.props.navigation}/>   

        : <Body/>
        }
          
        </Content>

      </Container>
    );
  }
}