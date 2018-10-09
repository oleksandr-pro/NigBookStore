/* @flow */

import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { bindActionCreators } from "redux";
import * as authActions from "../services/actions/authenticate";
import { connect } from "react-redux";
import styles from './categories/styles';
import { Container, Tabs, Tab, ScrollableTab, Icon } from 'native-base'
import * as COLOR from "../config/colors";
import DownHeaderBar from "./atoms/DownHeaderBar"
import Fictions from './categories/fictions';
import NonFictions from './categories/nonfictions';

class Category extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Categories",
    headerTintColor: COLOR.HEADER_TINT,
    headerStyle: {
      backgroundColor: COLOR.HEADER
    },
    headerRight: (
      <TouchableOpacity
        style={{
          marginRight: 16
        }}
        onPress={() => navigation.navigate("DrawerOpen")}
      >
        <Icon name="menu" size={32} style={{color:COLOR.ICON}} />
      </TouchableOpacity>
    )
  }); // navigationOptions

  constructor(){
    super();
    this.state = {
      selectedIndex:0,
      initialPage:0,
      activeTab:0   
    }
  }

  render() {
    const buttons = ['Fictions','Non Fictions'];
    const { selectedIndex, initialPage } = this.state;
    const DATAURLS = ['categories/award_winners','categories/adults', 'categories/nigerian-writings','categories/fictions', 'categories/non-fictions' ];
    return (
      <View
      style={{
        flex: 1,
        backgroundColor: COLOR.BACKGROUND,
        padding:0
      }}
     >
      <View
        style={{
          flex: 1,
          padding:0,
          margin:0,
          flexDirection:'column'
        }}
      >
        <View style={{height:24, marginTop:5}}>
           <DownHeaderBar data={buttons[selectedIndex]}/>
        </View>
        <Container>
          <Tabs
            initialPage={initialPage} page={this.state.activeTab}
            onChangeTab={(i, ref)=> this.setState({selectedIndex:i.i, initialPage:i.i, activeTab:i.i})}
            style={{backgroundColor:COLOR.DARK_PRIMARY_COLOR}}           
          >
            <Tab
              heading={buttons[0]}
              textStyle={styles.TabTextStyle}
              tabStyle={styles.TabStyle}
              activeTextStyle={styles.ActiveTextStyle}
              activeTabStyle={styles.ActiveTabStyle}             
              >
              <Fictions screenProps = {this.props.navigation}/>
            </Tab>
            <Tab
              heading={buttons[1]}
              textStyle={styles.TabTextStyle}
              tabStyle={styles.TabStyle}
              activeTextStyle={styles.ActiveTextStyle}
              activeTabStyle={styles.ActiveTabStyle}
            >
              <NonFictions screenProps = {this.props.navigation}/>
            </Tab>        
          </Tabs>
        </Container>
      </View>
    </View>
    );
  } // render
} // Profile
export default connect(
  state => ({ state: state.authenticate }),
  dispatch => ({
    actions: bindActionCreators(authActions, dispatch)
  })
)(Category);
