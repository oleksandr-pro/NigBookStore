import React, { Component } from 'react'
import { Alert, Dimensions, Platform, View } from 'react-native'
import { Button, Header, Icon, Input, Item, Left, Right, Text } from 'native-base'

 import { UltimateListView } from '../../../../lib'
import styles from './styles'
import LoadingSpinner from '../../atoms/loadingSpinner'
import ControlTab from '../../molecules/controlTab'
import FlatListItem from '../../molecules/itemContainer/flatListItem'
import FlatListGrid from '../../molecules/itemContainer/flatListGrid'
import ItemModal from '../../molecules/itemModal';

const { width, height } = Dimensions.get('window')
class MyInfinityScroll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      layout: 'grid',
      text: '',
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      results:[],
      index: 2,
      dataUrl: '',
      isModalVisible: false
    }
    console.log("MyInfinityScroll--");
    console.log(props);
  }
  componentDidMount() {

    this.makeRemoteRequest();
  }


  makeRemoteRequest = (page) => {
    console.log(page);
    const url = `https://zacsbooks.com/stores/`+this.props.dataUrl+'?page='+page;
    console.log('url', url);
    this.setState({ loading: true });
    return new Promise((resolve, reject) => {
      fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.nodes : [...this.state.data, ...res.nodes],
          error: res.error || null,
          loading: false,
          refreshing: false,
          
                    
        });
        console.log("Result", this.state.data);
        resolve(res.nodes);
      })
      .catch(error => {
        this.setState({ error, loading: false });
        reject(error);
      });
    });
  };

  sleep = (time) => new Promise(resolve => setTimeout(() => resolve(), time));

  

  onFetch = async (page = 1, startFetch, abortFetch) => {
    try {
      // This is required to determinate whether the first loading list is all loaded.
      let pageLimit = 10
      if (this.state.layout === 'grid') pageLimit = 10
      const skip = (page - 1) * pageLimit

      // Generate dummy data
      // let rowData = Array.from({ length: pageLimit }, (value, index) => `item -> ${index + skip}`)
       
        // My maid api call 
        
      const rowData = await this.makeRemoteRequest(page);
      console.log('page', page);
      console.log('rowdata', rowData);
      
      // Simulate the network loading in ES7 syntax (async/await)
      // await this.sleep(2000)
      startFetch(rowData, pageLimit)
    } catch (err) {
      abortFetch() // manually stop the refresh or pagination if it encounters network error
      console.log(err)
    }
  }

  

  onChangeLayout = (event) => {
    this.setState({ text: '' })
    switch (event.nativeEvent.selectedSegmentIndex) {
      case 0:
        this.setState({ layout: 'list' })
        break
      case 1:
        this.setState({ layout: 'grid' })
        break
      default:
        break
    }
  }

  onChangeScrollToIndex = (num) => {
    this.setState({ text: num })
    let index = num
    if (this.state.layout === 'grid') {
      index = num / 3
    }
    try {
      this.listView.scrollToIndex({ viewPosition: 0, index: Math.floor(index) })
    } catch (err) {
      console.warn(err)
    }
  }

  _onPressItem = (type, index, item) => {
    this._showModal(item);
  }

  _hideModal = () => {
    this.setState({isModalVisible: false})
  }

  _showModal = (selectedItem) => this.setState({ isModalVisible: true, selectedItem })



  renderItem = (item, index, separator) => {
    if (this.state.layout === 'list') {
      return (
        <FlatListItem item={item} index={index} onPress={this._onPressItem} />
      )
    } else if (this.state.layout === 'grid') {
      return (
        <FlatListGrid item={item} index={index} onPress={this._onPressItem} />
      )
    }
    return null
  }

//   renderControlTab = () => (
//     <ControlTab
//       layout={this.state.layout}
//       onChangeLayout={this.onChangeLayout}
//     />
//   )

  renderHeader = () => (
    <View>
      {/* <View style={styles.header}>
        <Text style={{ textAlign: 'center' }}>I am the Header View, you can put some Instructions or Ads Banner here!
        </Text>
      </View> */}
      {/* <View style={styles.headerSegment}>
        <Left style={{ flex: 0.15 }} />
        {this.renderControlTab()}
        <Right style={{ flex: 0.15 }} />
      </View> */}
    </View>
  )

  renderPaginationFetchingView = () => (
    <LoadingSpinner height={height * 0.2} text="loading..." />
  )

  render() {
    console.log(this.props.dataUrl)
    return (
      <View style={styles.container}>
        {/* <Header searchBar rounded>
          <Item style={{ backgroundColor: 'lightgray', borderRadius: 5 }}>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={this.onChangeScrollToIndex} value={this.state.text} />
          </Item>
        </Header> */}
        <UltimateListView
          ref={ref => this.listView = ref}
          key={this.state.layout} // this is important to distinguish different FlatList, default is numColumns
          onFetch={this.onFetch}
          keyExtractor={(item, index) => `${index} - ${item}`} // this is required when you are using FlatList
          // refreshableMode="basic" // basic or advanced
          item={this.renderItem} // this takes three params (item, index, separator)
          numColumns={this.state.layout === 'list' ? 1 : 3} // to use grid layout, simply set gridColumn > 1
          
          // ----Extra Config----
          displayDate
          header={this.renderHeader}
          paginationFetchingView={this.renderPaginationFetchingView}
          
          // sectionHeaderView={this.renderSectionHeaderView}   //not supported on FlatList
          // paginationFetchingView={this.renderPaginationFetchingView}
          // paginationAllLoadedView={this.renderPaginationAllLoadedView}
          // paginationWaitingView={this.renderPaginationWaitingView}
          // emptyView={this.renderEmptyView}
          // separator={this.renderSeparatorView}

          // new props on v3.2.0
          arrowImageStyle={{ width: 20, height: 20, resizeMode: 'contain' }}
          dateStyle={{ color: 'lightgray' }}
          refreshViewStyle={Platform.OS === 'ios' ? { height: 80, top: -80 } : { height: 80 }}
          refreshViewHeight={80}
        />
        <ItemModal 
          modalVisible={this.state.isModalVisible} 
          selectedItem={this.state.selectedItem}
          onDismiss={this._hideModal.bind(this)}
        />
      </View>
    )
  }
};

export default MyInfinityScroll;
