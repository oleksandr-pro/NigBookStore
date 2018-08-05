/* @flow */

import React, { Component } from 'react';
import { Image, View,     Dimensions, } from 'react-native';
import {  Card, CardItem, Text, Button, Icon, Body,  ActionSheet, Item, } from 'native-base';
import * as COLOR from "../../../config/colors";
import styles from './styles';
var BUTTONS = [ "Delete", "Cancel"];
var LIKEBUTTONS = ["Like", "Cancel"];
var DESTRUCTIVE_INDEX = 0;
var CANCEL_INDEX = 1;
const { width, height } = Dimensions.get('window')

class ShelfCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedNode:{
                'title':'Enchanted Ella',
                'Rating':'',
                'Author Name':'',
                'Body':'',
                'Pages':'',
                'Path':'',
                'Publisher':'',
                'Language':'',
                'Image':{
                    'src':'https://zacsbooks.com/sites/default/files/RECKLESS.jpg',
                    'alt':''
                }
            },    
        }
    }
    
  render() {
   const {book = {id:0, title:'', pages:0, read:false, like:false, image:''}} = this.props;
   console.log('book in the card', book);

    return (
      <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
     
          <View style={[ {width:width-20}]}>

            
                <Card style={{flex: 1}}>
                   
                    <CardItem bordered>
                        
                        <Body>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <View style={{flex:1, }}>
                                    <Image source={{uri: book.image}} style={{ flex: 1, height:200}}/>
                                </View>
                                <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center', padding:5}}>
                                    <Text numberOfLines={1} ellipsizeMode ={'tail'}>{this.state.selectedNode['Author Name']}</Text>
                                    <Text > {book.title}</Text>
                                                                        
                                    <View style={{flexDirection:'row',justifyContent:'center', alignItems:'center' }}>
                                       {book.like === true
                                        ?<Button transparent danger iconLeft>
                                            <Icon  type="FontAwesome" name='heart' large></Icon>
                                            </Button>
                                        :<Button transparent primary iconLeft 
                                        onPress={()=>
                                            ActionSheet.show(
                                                {
                                                    options: LIKEBUTTONS,
                                                    cancelButtonIndex: CANCEL_INDEX,
                                                    destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                                    title: "Do you like this book."
                                                },
                                                buttonIndex => {
                                                    if (buttonIndex === 0){
                                                        this.props.likeBook();
                                                    }
                                                   
                                                }
                                                )}>
                                             <Icon  type="FontAwesome" name='heart-o' large></Icon>
                                        </Button>
                                        } 
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'center', alignItems:'center' }}>
                                    <Button primary small onPress={() =>this.props.upreBook()}>
                                         
                                        <Text>Read </Text>
                                    
                                    </Button>
                                    <Button danger small
                                        onPress={() =>
                                        ActionSheet.show(
                                        {
                                            options: BUTTONS,
                                            cancelButtonIndex: CANCEL_INDEX,
                                            destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                            title: "Delete this book."
                                        },
                                        buttonIndex => {
                                            if (buttonIndex === 0){
                                                this.props.deleteBook();
                                            }
                                        }
                                        )}
                                    >
                                        <Icon name='trash'></Icon>
                                    </Button>
                                    
                                    
                                    </View>
                                   
                                    
                                </View>
                            </View>
                        
                        </Body>
                    </CardItem>
                   
                </Card>
               
          </View>

  </View>

    );
  } // render
} // Dashboard

export default ShelfCard;
