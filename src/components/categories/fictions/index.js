import React, { Component } from 'react';
import {ListView, View, Text,TouchableOpacity } from 'react-native';
import {Content} from 'native-base';
import styles from './styles';

export default class Fictions extends Component{
    componentWillMount(){

    }

    constructor(){
        super();
        const rowHasChanged = (r1, r2) => r1 !== r2
        const ds = new ListView.DataSource({rowHasChanged});
        const fictionObjects = [
            {
                id:1,
                title:'Academic Papers',
                data_url:'category/academic_papers'
            },
            {
                id:1,
                title:'Textbook',
                data_url:'category/textbook'
            },
            {
                id:1,
                title:'Past Question Papers',
                data_url:'category/past_question_papers'
            },
            {
                id:1,
                title:'Biographies & Memoirs',
                data_url:'category/biographies_memoirs'
            }
        ]
        this.state = {
            dataSource: ds.cloneWithRows(fictionObjects),
        };

    }

    _renderRow (rowData) {
        return (
          <TouchableOpacity 
          style={styles.rowMain}
          onPress = {()=>this.props.screenProps.navigate('CShow', {item:rowData})}
          >
            <View style={styles.rowConTitle}>
              <Text numberOfLines={2} style={styles.rowTitle}>{rowData.title}</Text>
            </View>
          </TouchableOpacity>
        )
      }

      render(){
          return (
            <Content style={styles.slidesec}>
                <ListView
                contentContainerStyle={styles.listContent}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
                enableEmptySections
                pageSize={4}/>
            </Content>
          )
        
      }
}