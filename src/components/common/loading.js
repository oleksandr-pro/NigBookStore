/* @flow */
import React, { Component } from "react";
import { View, Text, Modal, ActivityIndicator } from "react-native";
import * as COLOR from "../../config/colors";
import PropTypes from "prop-types";

class ModalProgress extends Component {
  render() {
    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={this.props.isVisible}
        onRequestClose={() => null}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              backgroundColor: COLOR.CARD,
              padding: 32,
              flexDirection: "row",
              alignItems: "center",
              shadowOffset: { width: 0, height: 13 },
              shadowOpacity: 0.3,
              shadowRadius: 6,
              elevation: 3
            }}
          >
            <ActivityIndicator isVisible={true} size="large" />
            <Text style={{ marginLeft: 8 }}>Loading...</Text>
          </View>
        </View>
      </Modal>
    );
  } // render
} //  ModalProgress

ModalProgress.propTypes = {
  isVisible: PropTypes.bool.isRequired
};

export default ModalProgress;
