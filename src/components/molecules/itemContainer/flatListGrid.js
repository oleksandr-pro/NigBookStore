import React, { PureComponent } from 'react'
import { StyleSheet, View, Alert, TouchableOpacity, TouchableHighlight, Dimensions, Text } from 'react-native'

import styles from './styles'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import Image from 'react-native-scalable-image';
import * as COLOR from '../../../config/colors'

import CustomCardContent from '../../atoms/CustomCardContent'

const logo = require('../../../assets/img/default-portrait.png')

const { width, height } = Dimensions.get('window')
export default class flatListGrid extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const rowID = this.props.index
    const rowData = this.props.item
    const pages = '252'
    console.log(rowData.node.Image.src);
    return (
      <TouchableOpacity onPress={() => this.props.onPress('GridView', rowID, rowData)}>
        <View style={{ margin: 0.5, width: (width-20) / 3, paddingBottom: 15 }}>
        <Card>
          <Image 
            source={{uri: rowData.node.Image.src}} 
            width = {(width-20) / 3}  
          />
         
          <CustomCardContent data={rowData.node}/>
          
        </Card>

        </View>
      </TouchableOpacity>
    )
  }
}
