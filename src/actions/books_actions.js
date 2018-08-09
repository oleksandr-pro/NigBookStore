export const BOOKS_AVAILABLE = 'BOOKS_AVAILABLE';
export const ADD_BOOK = 'ADD_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';

import {AsyncStorage} from "react-native";

// Add BOOK - CREATE (C)
export function addBook(book){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, books) => {
            if (books !== null){
                books = JSON.parse(books);
                books.unshift(book); //add the new quote to the top
                AsyncStorage.setItem('data', JSON.stringify(books), () => {
                    dispatch({type: ADD_BOOK, book:book});
                });
            }
        });
    };
}

// Get Data - READ (R)
export function getBooks(){
    return (dispatch) => {
        console.log('getbooks');
        AsyncStorage.getItem('data', (err, books) => {
            if (books !== null){
                dispatch({type: BOOKS_AVAILABLE, books:JSON.parse(books)});
            } 
        });
    };
}

// Update Book - UPDATE (U)
export function updateBook(book){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, books) => {
            if (books !== null){
                books = JSON.parse(books);
                var index = getIndex(books, book.id); //find the index of the quote with the id passed
                if (index !== -1) {
                    books[index]['title'] = book.title;
                    books[index]['pages'] = book.pages;
                    books[index]['read'] = book.read;
                    books[index]['like'] = book.like;
                    books[index]['image'] = book.image;
                    books[index]['wish'] = book.wish;
                }
                AsyncStorage.setItem('data', JSON.stringify(books), () => {
                    dispatch({type: UPDATE_BOOK, book:book});
                });
            }
        });
    };
}

// Delete BOOK - DELETE (D)
export function deleteBook(id){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, books) => {
            if (books !== null){
                books = JSON.parse(books);

                var index = getIndex(books, id); //find the index of the quote with the id passed
                if(index !== -1) books.splice(index, 1);//if yes, undo, remove the QUOTE
                AsyncStorage.setItem('data', JSON.stringify(books), () => {
                    dispatch({type: DELETE_BOOK, id:id});
                });
            }
        });
    };
}

function getIndex(data, id){
    let clone = JSON.parse(JSON.stringify(data));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}