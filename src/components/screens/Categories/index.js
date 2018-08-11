/* @flow */

import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { bindActionCreators } from "redux";
import * as authActions from "../../../actions/authenticate";
import { connect } from "react-redux";
import MyInfinityScroll from "../MyInfinityScroll"
import * as COLOR from "../../../config/colors";
import DownHeaderBar from "../../atoms/DownHeaderBar"
import { Container, Tabs, Tab, ScrollableTab, Icon } from 'native-base'
import styles from './styles';

class Categories extends Component {
  static navigationOptions = {
    tabBarLabel: "Categories",
    tabBarIcon: ({ tintColor }) => (
      <Icon type="Entypo" name="list" size={24} style={{color:COLOR.ICON}} />
    )
  }; // navigationOptions
  constructor () {
    super()
    this.state = {
      selectedIndex:0,
      initialPage:0,
      activeTab:0
     
    }
    this.updateIndex = this.updateIndex.bind(this)
  };

  componentDidMount(){
    this.setState({selectedIndex:0,initialPage:0, activeTab:0});
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex});
  };

  render() {

    const buttons = ['Award Winners', 'Adults','Nigerian Writing', 'Fictions','Non Fictions'];
    const { selectedIndex, initialPage } = this.state;
    const DATAURLS = ['categoriesapi','categoriesapi', 'categoriesapi','categoriesapi', 'categoriesapi' ];
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
            renderTabBar={()=> <ScrollableTab />}            
          >
            <Tab
              heading={buttons[0]}
              textStyle={styles.TabTextStyle}
              tabStyle={styles.TabStyle}
              activeTextStyle={styles.ActiveTextStyle}
              activeTabStyle={styles.ActiveTabStyle}             
              >
               <MyInfinityScroll dataUrl={DATAURLS[0]} screenProps = {this.props.screenProps}/>
              
            </Tab>
            <Tab
              heading={buttons[1]}
              textStyle={styles.TabTextStyle}
              tabStyle={styles.TabStyle}
              activeTextStyle={styles.ActiveTextStyle}
              activeTabStyle={styles.ActiveTabStyle}
            >
              <MyInfinityScroll dataUrl={DATAURLS[1]} screenProps = {this.props.screenProps}/>
            </Tab>

            <Tab
              heading={buttons[2]}
              textStyle={styles.TabTextStyle}
              tabStyle={styles.TabStyle}
              activeTextStyle={styles.ActiveTextStyle}
              activeTabStyle={styles.ActiveTabStyle}
            >
              <MyInfinityScroll dataUrl={DATAURLS[2]} screenProps = {this.props.screenProps}/>
            </Tab>
            <Tab
              heading={buttons[3]}
              textStyle={styles.TabTextStyle}
              tabStyle={styles.TabStyle}
              activeTextStyle={styles.ActiveTextStyle}
              activeTabStyle={styles.ActiveTabStyle}
            >
              <MyInfinityScroll dataUrl={DATAURLS[3]} screenProps = {this.props.screenProps}/>
              
            </Tab>
            <Tab
              heading={buttons[4]}
              textStyle={styles.TabTextStyle}
              tabStyle={styles.TabStyle}
              activeTextStyle={styles.ActiveTextStyle}
              activeTabStyle={styles.ActiveTabStyle}
            >
              <MyInfinityScroll dataUrl={DATAURLS[4]} screenProps = {this.props.screenProps}/>
              
            </Tab>
            
          </Tabs>

        </Container>

      </View>
    </View>
    );
  } // render
} // Dashboard

export default Categories;
