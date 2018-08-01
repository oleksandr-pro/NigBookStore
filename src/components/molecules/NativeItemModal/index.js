
import React, { Component } from 'react';
import {

    TouchableOpacity,
    View,
    Dimensions,
    TouchableHighlight
  } from 'react-native';

// import Icon from "react-native-vector-icons/MaterialIcons";

import Modal from 'react-native-modal';
import styles from './styles';
// import Image from 'react-native-scalable-image';
// import {Card, CardTitle, CardContent, CardAction, CardButton, CardImage} from 'react-native-material-cards';

import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';

export default class NativeItemModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedNode:{
                'title':'',
                'Rating':'',
                'Author Name':'',
                'Body':'',
                'Pages':'',
                'Path':'',
                'Publisher':'',
                'Language':'',
                'Image':{
                    'src':'http://bit.ly/2GfzooV',
                    'alt':''
                }
            }
        }
    }
    

    componentDidUpdate(prevprops){
        if(prevprops.selectedItem!==this.props.selectedItem){
            if (typeof(this.props.selectedItem) !=='undefined'){
                this.setState({selectedNode:this.props.selectedItem.node});
            } 
            
        }
    }
    
    render() {
        console.log("selected", this.props.selectedItem);
        
        const { width, height } = Dimensions.get('window')
      return (
          <View>
              <Modal
              animationType="slide"
              transparent={true}
              visible={this.props.modalVisible}
              onRequestClose={() => { this.props.onDismiss() }}
              >
              
                  <View style={styles.container}>
  
                    {/* <Card
                        style={styles.CardStyle}
                    >
                        <View 
                            style={styles.CloseIconContainer}
                        >   
                            <View style={{flex:1}}/>
                            <TouchableHighlight
                            
                            // onPress={() => this.props.onDismiss() }
                            >
                            <Icon size={20} color={'#000000'} />
                            </TouchableHighlight>
                        </View>
                        
                        <CardImage 
                        
                        source={{ uri: this.state.selectedNode.Image.src }} 
                        // width = {(width)/2}
                        style={{flex:4}}
                        resizeMode = 'contain'
                        
                        />
                        <View
                            style ={{flex:5, flexDirection:'column', paddingRight:10, paddingLeft:10}}>
                            <CardTitle
                            style={{flex:1}}
                            subtitle={this.state.selectedNode.title}
                            />
                            <CardAction 
                            style={{flex:1, flexDirection:'column'}}
                            inColumn={false}>
                                <View style={{flex:1, justifyContent:'center',alignItems:'center',flexDirection:'row' }}>
                                    <CardButton
                                        onPress={() => this.props.onDismiss()}
                                        title="BuyNow"
                                        color="#ffffff"
                                        style={{backgroundColor:'#3949AB'}}
                                    />
                                </View>
                            </CardAction>
                            <Text 
                                style={{flex:4, justifyContent:'center', alignItems:'center'}}
                            >
                            {this.state.selectedNode.Rating}
                                </Text>
                            <CardAction 
                            separator={true} 
                            inColumn={false}>
                            
                                <CardButton
                                    onPress={() => this.props.onDismiss()}
                                    title="Close"
                                    color="#FEB557"
                                />
                            </CardAction>
                        </View>
   
                    </Card> */}
                    <Container style={{backgroundColor:'transparent', flex:1, justifyContent:'center',alignContent:'center'}}>
                        
                        <Content style={{backgroundColor:'transparent'}}>
                        <Card style={{flex: 1}}>
                            <CardItem bordered>
                            <Left>
                                <Thumbnail source={require('../../../assets/img/ic_launcher_round.png')} style={{width:35, height:35}} />
                                <Body>
                                    <View style={{flex:1, flexDirection:'row'}}>
                                        <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
                                            <Text numberOfLines={2} ellipsizeMode ={'tail'} style={{fontSize:15}}>{this.state.selectedNode.title}</Text>
                                        </View>
                                        <Button transparent textStyle={{color: '#87838B', marginRight:-15}}  onPress={() => this.props.onDismiss()}>
                                        <Icon name="close" />
                                        
                                        </Button>
                                    </View>
                                
                                </Body>
                            </Left>
                            </CardItem>
                            <CardItem bordered>
                                
                                <Body>
                                    <View style={{flex:1, flexDirection:'row'}}>
                                        <View style={{flex:1, }}>
                                            <Image source={{uri: this.state.selectedNode.Image.src}} style={{ flex: 1, height:200}}/>
                                        </View>
                                        <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center', padding:5}}>
                                            <Text numberOfLines={1} ellipsizeMode ={'tail'}>{this.state.selectedNode['Author Name']}</Text>
                                            <Text> Pages: {this.state.selectedNode.Pages}</Text>
                                            <Text>{this.state.selectedNode.Language}</Text>
                                            <Text></Text>
                                            <View style={{flexDirection:'column',justifyContent:'center', alignItems:'center' }}>
                                            <Button primary  onPress={() => this.props.onDismiss()}>
                                                <Text>BUY NOW </Text>
                                            
                                            </Button>
                                            </View>
                                            
                                        </View>
                                    </View>
                                
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Text style={{color:'gray'}}>Description</Text>
                                </Left>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                    <View style={{paddingTop:5}}>
                                        <Text >
                                        {this.state.selectedNode.Body}
                                        </Text>
                                    </View>
                                </Body>

                            </CardItem>
                            <CardItem footer bordered>
                            <Left>
                                <Button transparent textStyle={{color: '#87838B'}}  onPress={() => this.props.onDismiss()}>
                                <Icon name="close" />
                                <Text>CLOSE</Text>
                                </Button>
                            </Left>
                            </CardItem>
                        </Card>
                        </Content>
                    </Container>
                  </View>
              </Modal>
          </View>
      );
    }
  }