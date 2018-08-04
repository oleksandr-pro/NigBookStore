/* @flow */

import React, { Component } from "react";
import { View, Text, TouchableOpacity,FlatList } from "react-native";
var {
    StyleSheet,
    ListView,
    ActivityIndicator, TouchableHighlight, ActionSheetIOS, TouchableWithoutFeedback
} = require('react-native');

import Icon from "react-native-vector-icons/MaterialIcons";

import { bindActionCreators } from "redux";
import * as bookActions from "../../../../actions/books_actions";
import { connect } from "react-redux";
import {AsyncStorage} from "react-native";
import Data from "../../../../books.json"
import * as COLOR from "../../../../config/colors";
import ShelfCard from "../../../molecules/ShelfCard";

var _this;
var BUTTONS = [
    "Edit",
    "Delete",
    'Cancel',
];

var CANCEL_INDEX = 2;


class Munread extends Component {
 
    constructor(props){
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            ds: ds
        };
    }
  componentDidMount(){
    this.props.getBooks();
  }

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
                <View style={{flex: 1, backgroundColor: '#eaeaea'}}>
                    <ListView enableEmptySections={true}
                            dataSource={this.state.ds.cloneWithRows(this.props.books)}
                            renderRow={this.renderRow.bind(this)}/>

                    <TouchableHighlight style={styles.addButton}
                                        underlayColor='#ff7043' >
                        <Text style={{fontSize: 25, color: 'white'}}>+</Text>
                    </TouchableHighlight>
                </View>
            );
        }
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            // <TouchableOpacity onPress={() => this.props.deleteBook(rowData.id)}>
            //     <View style={styles.row}>
            //         <Text style={styles.description}>
            //             {rowData.pages}
            //         </Text>
            //         <Text style={styles.author}>
            //             {rowData.title}
            //         </Text>
                   
            //     </View>
            // </TouchableOpacity>
            <ShelfCard book ={rowData} deleteBook={()=>this.props.deleteBook(rowData.id)}/>
        )
    }

    showOptions(book) {
        ActionSheetIOS.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: 1,
            },
            (buttonIndex) => {
                 _this.props.deleteBook(book.id)
            });
    } // render
} // Home
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

var styles = StyleSheet.create({
    activityIndicatorContainer: {
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },

    row: {
        backgroundColor: "#fff",
        padding: 8 * 2,
        marginBottom: 1
    },

    author: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 8 * 2
    },

    quote: {
        marginTop: 5,
        fontSize: 14,
    },

    addButton: {
        backgroundColor: '#ff5722',
        borderColor: '#ff5722',
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
});

