/* @flow */

import React, { Component } from "react";
import { View} from "react-native";
var {    
    ListView,
    ActivityIndicator,
} = require('react-native');
import { bindActionCreators } from "redux";
import * as bookActions from "../../../../actions/books_actions";
import { connect } from "react-redux";
import {Content, List} from 'native-base';
import ShelfCard from "../../../molecules/ShelfCard";
import styles from "./styles";
import Loader from '../../../atoms/Loader';
import RNFS from 'react-native-fs';

class Munread extends Component {
 
    constructor(props){
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            books:[],
            loading: false,
        };
    }
  componentWillReceiveProps(nextProps){
      if(nextProps!==this.props){

          this.setState({books:nextProps.books});
      }

  }

  componentDidMount(){
      this.props.getBooks();
      this.setState({books:this.props.books});

  }

//   updateBook(book){
//       book['wish'] = false;
//       this.props.updateBook(book);
//   }

  likeBook(book){
    book['like']=true;
    this.props.updateBook(book);
    }

  updateBook(book){

        this.setState({loading:true});
        let path = RNFS.DocumentDirectoryPath+'/www'+'/downloaded1.epub';
        RNFS.mkdir(RNFS.DocumentDirectoryPath+'/www').then(()=>{
            RNFS.downloadFile({fromUrl:'https://zacsbooks.com/sites/default/files/Christmas_in_Nigeria_Converted_Cleaned_Ready_4.epub', toFile: path}).promise.then(res => {
            console.log('The file saved to ', res.statusCode)
            this.setState({loading:false});
            book['wish']=false;
            this.props.updateBook(book);
            Alert.alert('Success', 'This book has downloaded!')
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
      console.log('Rendering', this.state.books);
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
                    <Loader
                        loading={this.state.loading} /> 
                    <Content>
                    <List>
                    {this.state.books.map((item, index) => {
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

