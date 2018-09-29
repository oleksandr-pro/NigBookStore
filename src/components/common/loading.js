/* @flow */
import React, { Component } from "react";
import { View, Text, Modal, ActivityIndicator } from "react-native";
import * as COLOR from "../../config/colors";
import PropTypes from "prop-types";
import { SkypeIndicator,} from 'react-native-indicators';

class ModalProgress extends Component {
  render() {
    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={this.props.isVisible}
        onRequestClose={this.props.onClose}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:'#555', opacity:0.5 }}
        />
        <View style ={{position:'absolute', top:0, left:0, bottom:0, right:0, justifyContent:'center', alignItems:'center'}}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius:5,
              width: 50,
              height:50,
              flexDirection: "row",
              justifyContent:'center',
              alignItems: "center",
              shadowOffset: { width: 0, height: 13 },
              shadowOpacity: 0.3,
              shadowRadius: 6,
              elevation: 3
            }}
          >
            <SkypeIndicator size={32} color={'#1e90ff'}/>
          </View>
        </View>
      </Modal>
    );
  } // render
} //  ModalProgress

ModalProgress.PropTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func
};
ModalProgress.defaultProps = {
  onClose: ()=>{},
  isVisible: false
}

export default ModalProgress;
