import React, { Component } from 'react';
import {ListView, View, Text,TouchableOpacity } from 'react-native';
import {Content} from 'native-base';
import styles from './styles';

export default class NonFictions extends Component{
    componentWillMount(){

    }

    constructor(){
        super();
        const rowHasChanged = (r1, r2) => r1 !== r2
        const ds = new ListView.DataSource({rowHasChanged});
        const fictionObjects = [
            {
                id:1,
                title:'Romance',
                data_url:'category/romance'
            },
            {
                id:1,
                title:'Science and Fantasy ',
                data_url:'category/science_fantasy'
            },
            {
                id:1,
                title:'Literature',
                data_url:'category/literature'
            },
            {
                id:1,
                title:'Mystery, Thriller and Suspense ',
                data_url:'category/mystery_thriller_suspense'
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