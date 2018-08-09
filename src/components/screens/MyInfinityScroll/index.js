import React, { Component } from 'react'
import { Dimensions, Platform, View } from 'react-native'
import { UltimateListView } from '../../../../lib'
import styles from './styles'
import LoadingSpinner from '../../atoms/loadingSpinner'
import FlatListGrid from '../../molecules/itemContainer/flatListGrid'
import NativeItemModal from '../../molecules/NativeItemModal'
import { connect } from "react-redux";
import {addBook, updateBook} from '../../../actions/books_actions'

const { width, height } = Dimensions.get('window')
class MyInfinityScroll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      layout: 'grid',
      text: '',
      loading: false,
      data: [],
      page: 0,
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

  generateID() {
    var d = new Date().getTime();
    var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(5);
    });
    return id;
  }

  makeRemoteRequest = (page) => {
    console.log(page);
    const url = `https://zacsbooks.com/stores/`+this.props.dataUrl+'?page='+(page-1);
    console.log('url', url);
    this.setState({ loading: true });
    return new Promise((resolve, reject) => {
      fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: [],
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

  

  onFetch = async (page = 0, startFetch, abortFetch) => {
    try {
      let pageLimit = 12
      if (this.state.layout === 'grid') pageLimit = 12
      const skip = (page - 1) * pageLimit
      const rowData = await this.makeRemoteRequest(page);
      console.log('page', page);
      console.log('rowdata', rowData);
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
        <FlatListGrid item={item} index={index} onPress={this._onPressItem} />
      )
    } else if (this.state.layout === 'grid') {
      return (
        <FlatListGrid item={item} index={index} onPress={this._onPressItem} />
      )
    }
    return null
  }

  renderHeader = () => (
    <View>     
    </View>
  )

  renderPaginationFetchingView = () => (
    <LoadingSpinner height={height * 0.2} text="loading..." />
  )

  render() {
    if (this.props.loading) {
      return (
          <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator
                  animating={true}
                  style={[{height: 80}]}
                  size="small"
              />
          </View>
      );
      } else {
        return (
          <View style={styles.container}>
            <UltimateListView
              ref={ref => this.listView = ref}
              key={this.state.layout} // this is important to distinguish different FlatList, default is numColumns
              onFetch={this.onFetch}
              keyExtractor={(item, index) => `${index} - ${item}`} // this is required when you are using FlatList
              // refreshableMode="basic" // basic or advanced
              item={this.renderItem} // this takes three params (item, index, separator)
              numColumns={this.state.layout === 'list' ? 1 : 3} // to use grid layout, simply set gridColumn > 1
              displayDate
              header={this.renderHeader}
              paginationFetchingView={this.renderPaginationFetchingView}
              arrowImageStyle={{ width: 20, height: 20, resizeMode: 'contain' }}
              dateStyle={{ color: 'lightgray' }}
              refreshViewStyle={Platform.OS === 'ios' ? { height: 80, top: -80 } : { height: 80 }}
              refreshViewHeight={80}
            />
            <NativeItemModal 
              modalVisible={this.state.isModalVisible} 
              selectedItem={this.state.selectedItem}
              onDismiss={this._hideModal.bind(this)}
              screenProps = {this.props.screenProps}
              onAdd={()=>this.props.addBook(
                {id:this.generateID(),
                title:this.state.selectedItem.node.title,
                pages:this.state.selectedItem.node.Pages,
                image: this.state.selectedItem.node.Image.src,
                read: true,
                wish: false, 
                like: false,
                
              }
              )}
              onAddWISH={()=>this.props.addBook(
                {id:this.generateID(),
                title:this.state.selectedItem.node.title,
                pages:this.state.selectedItem.node.Pages,
                image: this.state.selectedItem.node.Image.src,
                read: false, 
                like: false,
                wish: true,
              }
              )
              }
            />
          </View>
        )
      }    
  }
};

function mapStateToProps(state, props) {
  return {}
}

export default connect(mapStateToProps, {addBook, updateBook})(MyInfinityScroll);
