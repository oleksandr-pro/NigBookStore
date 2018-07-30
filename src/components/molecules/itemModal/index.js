
import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    TouchableHighlight
  } from 'react-native';

import Icon from "react-native-vector-icons/MaterialIcons";

import Modal from 'react-native-modal';
import styles from './styles';
import Image from 'react-native-scalable-image';
import {Card, CardTitle, CardContent, CardAction, CardButton, CardImage} from 'react-native-material-cards';


export default class ItemModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedNode:{
                'title':'',
                'Rating':'',
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
  
                    <Card
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
   
                    </Card>
                  </View>
              </Modal>
          </View>
      );
    }
  }