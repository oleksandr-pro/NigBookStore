/* @flow */

import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import * as COLOR from "../../../config/colors";
import styles from './styles';
import DownHeaderBar from "../../atoms/DownHeaderBar"
import MyInfinityScroll from "../MyInfinityScroll"
import { Container, Tabs, Tab, ScrollableTab } from 'native-base'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BookCategories from "../StoreTabViews/BookCategories";


class StoreView extends Component {
  static navigationOptions = ({navigation}) => ({
    tabBarLabel: "Bookshop",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="shopping" size={24} color={COLOR.ICON} />
    )
  }); // navigationOptions

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
    const buttons = ['Featured', 'New Books','Categories', 'Best Seller','All'];
    const { selectedIndex, initialPage } = this.state;
    const DATAURLS = ['stores/featured_book','stores/new_books', 'stores/best_sellers','stores/all'];
    
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
              heading={'Featured'}
              textStyle={styles.TabTextStyle}
              tabStyle={styles.TabStyle}
              activeTextStyle={styles.ActiveTextStyle}
              activeTabStyle={styles.ActiveTabStyle}             
              >
               <MyInfinityScroll dataUrl={DATAURLS[0]} screenProps = {this.props.screenProps}/>
              
            </Tab>
            <Tab
              heading={'New Books'}
              textStyle={styles.TabTextStyle}
              tabStyle={styles.TabStyle}
              activeTextStyle={styles.ActiveTextStyle}
              activeTabStyle={styles.ActiveTabStyle}
            >
              <MyInfinityScroll dataUrl={DATAURLS[1]} screenProps = {this.props.screenProps}/>
            </Tab>

            <Tab
              heading={'Best Seller'}
              textStyle={styles.TabTextStyle}
              tabStyle={styles.TabStyle}
              activeTextStyle={styles.ActiveTextStyle}
              activeTabStyle={styles.ActiveTabStyle}
            >
              <MyInfinityScroll dataUrl={DATAURLS[2]} screenProps = {this.props.screenProps}/>
            </Tab>
            <Tab
              heading={'All'}
              textStyle={styles.TabTextStyle}
              tabStyle={styles.TabStyle}
              activeTextStyle={styles.ActiveTextStyle}
              activeTabStyle={styles.ActiveTabStyle}
            >
              <MyInfinityScroll dataUrl={DATAURLS[3]} screenProps = {this.props.screenProps}/>
              
            </Tab>
            
          </Tabs>
          </Container>
        </View>
      </View>
    );
  } 
} 
export default StoreView;
