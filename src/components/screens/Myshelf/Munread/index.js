/* @flow */

import React, { Component } from "react";
import { View} from "react-native";
var {    
    ListView,
    ActivityIndicator,
} = require('react-native');
import { bindActionCreators } from "redux";
import * as bookActions from "../../../../services/actions/books_actions";
import { connect } from "react-redux";
import {Content, List} from 'native-base';
import ShelfCard from "../../../molecules/ShelfCard";
import styles from "./styles";
import RNFS from 'react-native-fs';
import ModalProgress from "../../../common/loading";

class Munread extends Component {
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            books:[],
            loading: false,
        };
    }

  componentDidMount(){
      this.props.getBooks();
      this.setState({books:this.props.books});
  }

  likeBook(book){
    book['like']=true;
    this.props.updateBook(book);
    }

    onCloseModal=()=>{
        this.setState({loading:false});
    }

  updateBook(book){
        let {downloadurl=''} = book;
        var flag = downloadurl.split('/').length;
        if (flag>0){
            var filename = downloadurl.split('/')[flag-1];
            console.log('filename', filename);
        }
        this.setState({loading:true});
        setTimeout(() => {
            this.props.onDismiss();
            if (this.state.loading){
                this.setState({loading:false});
                return Alert.alert('Timeout', 'Timeout. Connection error');
            }
        }, 60000);
        let path = RNFS.DocumentDirectoryPath+'/www/'+ filename;
        RNFS.mkdir(RNFS.DocumentDirectoryPath+'/www').then(()=>{
            RNFS.downloadFile({fromUrl:downloadurl, toFile: path}).promise.then(res => {
            console.log('The file saved to ', res.statusCode)
            this.setState({loading:false});
            book['localpath'] = filename;
            book['wish']=false;
            this.props.updateBook(book);
            Alert.alert('Success', 'This book has downloaded!');
          })
          .catch((err)=>{
              console.log('err', err);
              this.setState({loading:false});
              this.props.onDismiss();
              Alert.alert('Failed', 'This book has not downloaded!')
          });

        })
        
    }

  render() {
      const {books} = this.props;
      console.log('Rendering', books);
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
                <View style={{flex: 1, backgroundColor: '#eaeaea'}}>
                    <ModalProgress
                        isVisible={this.state.loading} /> 
                    <Content>
                    <List>
                    {books.map((item, index) => {
                        return (
                        <View key={index}>
                            {item.read ===true  && item.wish===true
                                ?<ShelfCard
                                 screenProps ={this.props.screenProps} 
                                 book ={item} 
                                 deleteBook={()=>this.props.deleteBook(item.id)}
                                 upreBook={()=>this.updateBook(item)}
                                 likeBook={()=>this.likeBook(item)}/>
                                :<View/>
                            }
                        </View>
                        )
                    })}
                </List>
                </Content>
                </View>
            );
        }
    }

} 

function mapStateToProps(state, props) {
    return {
        loading: state.booksControl.loading,
        books: state.booksControl.books
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(bookActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Munread);

