import React, { Component } from 'react'
import {  View,  TouchableOpacity, Dimensions, Image } from 'react-native'
// import Image from 'react-native-scalable-image';
import { Card, CardItem, Body, Text,  Icon} from 'native-base';
const logo = require('../../../assets/img/default-portrait.png')
const { width, height } = Dimensions.get('window')

export default class HalfShelfCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {book = {id:0, title:'', pages:0, read:false, like:false, image:''}} = this.props;
    console.log(book.image);
    const {state = ''} = this.props;
    console.log('state', state);
    return (
      <TouchableOpacity onPress={() => {}}>
        <View style={{ margin: 0.5, width: '100%', paddingBottom: 3 }}>
        <Card>
            <CardItem cardBody>
            
                <Image 
                source={{uri: book.image}} 
                style={{height: 150, width: null, flex: 1}}
                resizeMode={Image.resizeMode.contain}    
                />
                { state === 'wish'
                    ?
                        <Icon  type="FontAwesome" name='heart' style={{ position: 'absolute', top: 5, right: 0, color:'#ee0000', fontSize:15 }}></Icon> 
                    : <View/>
                }
            </CardItem>
            <CardItem>
                <Body>
                    <View style={{ flexDirection:'row', flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text numberOfLines={1} ellipsizeMode ={'tail'} style={{fontSize:12}}>{book.title}</Text>
                    </View>
                    <View style={{ flexDirection:'row', flex:1, justifyContent:'center', alignItems:'center'}}>
                    
                    </View>
                </Body>
            </CardItem>
        </Card>

        </View>
      </TouchableOpacity>
    )
  }
}
