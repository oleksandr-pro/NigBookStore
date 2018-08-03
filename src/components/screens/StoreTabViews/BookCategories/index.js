/* @flow */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from './styles';
import CategoryModal from '../../../molecules/CategoryModal'
import EpubReader from '../../../../epubreader/epubreader';


class BookCategories extends Component {
  constructor(props){
    super(props);
    this.state = {
      categories: [{
        "title":"Award Winners",
        "url":"award_winners"
      },
      {
        "title":"Adults",
        "url":"adults"
      },
      {
        "title":"Nigerian Writing",
        "url":"nigerian-writings"
      },
      {
        "title":"Fictions",
        "url":"fictions"
      },
      {
        "title":"Non Fictions",
        "url":"non-fictions"
      }],
      selectedItem:{
        "title":"Award Winners",
        "url":"award_winners"
      },
      isModalVisible:false
    }
  }

 

  _onPressItem = (item) => {

    this._showModal(item);
    
  }

  _hideModal = () => {
    this.setState({isModalVisible: false})
  }

  _showModal = (selectedItem) => this.setState({ isModalVisible: true, selectedItem })

  render() {
    return (
      <View style={styles.container} >
        
          <FlatList
          data={this.state.categories}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
          <View style={styles.flatview}>
            <TouchableOpacity
            onPress={(event)=>this._onPressItem(item)}
            >
              <Text style={styles.name}>{item.title}</Text>
            </TouchableOpacity>
          </View>
          }
          keyExtractor={item => item.url}
          />
          <CategoryModal 
          modalVisible={this.state.isModalVisible} 
          selectedItem={this.state.selectedItem}
          onDismiss={this._hideModal.bind(this)}
        />
      </View>
      
    );
  } // render
} // Dashboard

export default BookCategories;
