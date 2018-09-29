/* @flow */

import React, { Component } from "react";
import { View,} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as COLOR from "../../../config/colors";
import DownHeaderBar from "../../atoms/DownHeaderBar"
import { Container, Tabs, Tab, } from 'native-base'
import styles from './styles';
import ViewAccount from "./Viewaccount";
import EditAccount from "./Editaccount";

class Myaccount extends Component {
  static navigationOptions = {
    tabBarLabel: "My Account",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="account-circle" size={24} color={COLOR.ICON} />
    )
  }; // navigationOptions
  constructor(){
    super();
    this.state = {
      selectedIndex:0,
      initialPage:0,
      activeTab:0
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  componentDidMount(){
    this.setState({selectedIndex:0,initialPage:0, activeTab:0});
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex});
  };
  
  render() {
    const buttons = ['View', 'Edit'];
    const { selectedIndex, initialPage } = this.state;
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
            heading={'View'}
            textStyle={styles.TabTextStyle}
            tabStyle={styles.TabStyle}
            activeTextStyle={styles.ActiveTextStyle}
            activeTabStyle={styles.ActiveTabStyle}
            
            >
             <ViewAccount/>
            
          </Tab>
          <Tab
            heading={'Edit'}
            textStyle={styles.TabTextStyle}
            tabStyle={styles.TabStyle}
            activeTextStyle={styles.ActiveTextStyle}
            activeTabStyle={styles.ActiveTabStyle}
          >
             <EditAccount/>
          </Tab>          
        </Tabs>
        </Container>
      </View>
    </View>
    );
  } // render
} // Feed

export default Myaccount;
