
import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    Icon,
    TouchableHighlight
  } from 'react-native';

import Modal from 'react-native-modal';
import styles from './styles';

export default class ItemModal extends Component {
    constructor(props){
        super(props);
    }
    render() {
        console.log(this.props.selectedItem);
      return (
          <View>
              <Modal
              animationType="slide"
              transparent={true}
              visible={this.props.modalVisible}
             // onRequestClose={() => { this.props.onDismiss() }}
              >
                  <View style={styles.container}>
                      <View style={styles.innerContainer}>
                          <Text>Item Detail</Text>
                          <TouchableHighlight
                              style={styles.buttonContainer}
                               onPress={() => this.props.onDismiss() }
                              >
                              <Text style={styles.buttonText}>Close</Text> 
                          </TouchableHighlight>
                      </View>
                  </View>
              </Modal>
          </View>
      );
    }
  }