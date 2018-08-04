/* @flow */

import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { bindActionCreators } from "redux";
import * as authActions from "../../../actions/authenticate";
import { connect } from "react-redux";

import DownHeaderBar from "../../atoms/DownHeaderBar"
import MyInfinityScroll from "../MyInfinityScroll"
import { Container, Tabs, Tab, ScrollableTab } from 'native-base'
import * as COLOR from "../../../config/colors";
import styles from './styles';
import Munread from "./Munread";
import Mread from "./Mread";


class Myshelf extends Component {
  static navigationOptions = {
    tabBarLabel: "My shelf",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="book-open-variant" size={24} color={COLOR.ICON} />
    )
  }; // navigationOptions

  constructor () {
    super();
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
    const buttons = ['Read', 'Unread','Recent', 'Wishlist'];
    const { selectedIndex, initialPage } = this.state;
    const DATAURLS = ['featured_book','new_books', 'best_sellers','all'];
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
            // tabBarBackgroundColor={COLOR.DARK_PRIMARY_COLOR}
            onChangeTab={(i, ref)=> this.setState({selectedIndex:i.i, initialPage:i.i, activeTab:i.i})}
            renderTabBar={()=> <ScrollableTab />}
          >
            <Tab
              heading={'Read'}
              textStyle={styles.TabTextStyle}
              tabStyle={styles.TabStyle}
              activeTextStyle={styles.ActiveTextStyle}
              activeTabStyle={styles.ActiveTabStyle}
              
              >
              <Mread screenProps = {this.props.screenProps}/>
              
            </Tab>
            <Tab
              heading={'Unread'}
              textStyle={styles.TabTextStyle}
              tabStyle={styles.TabStyle}
              activeTextStyle={styles.ActiveTextStyle}
              activeTabStyle={styles.ActiveTabStyle}
            >
              <Munread/>
            </Tab>

            <Tab
              heading={'Recent'}
              textStyle={styles.TabTextStyle}
              tabStyle={styles.TabStyle}
              activeTextStyle={styles.ActiveTextStyle}
              activeTabStyle={styles.ActiveTabStyle}
            >
              <MyInfinityScroll dataUrl={DATAURLS[2]}/>
            </Tab>
            <Tab
              heading={'Wishlist'}
              textStyle={styles.TabTextStyle}
              tabStyle={styles.TabStyle}
              activeTextStyle={styles.ActiveTextStyle}
              activeTabStyle={styles.ActiveTabStyle}
            >
              <MyInfinityScroll dataUrl={DATAURLS[3]}/>
              
            </Tab>
            
          </Tabs>
          </Container>


        </View>
      </View>
    );
  } // render
} // Dashboard

export default Myshelf;
