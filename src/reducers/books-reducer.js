import { combineReducers } from 'redux';

import { BOOKS_AVAILABLE, ADD_BOOK, UPDATE_BOOK, DELETE_BOOK } from "../actions/books_actions" //Import the actions types constant we defined in our actions

let dataState = { books: [], loading:true };

export default function booksControl (state = dataState, action={}) {
    switch (action.type) {
        case ADD_BOOK:{
            let books =  cloneObject(state.books) //clone the current state
            books.unshift(action.book); //add the new quote to the top
            state = Object.assign({}, state, { books: books});
            return state;
        }

        case BOOKS_AVAILABLE:
            state = Object.assign({}, state, { books: action.books, loading:false });
            return state;

        case UPDATE_BOOK:{
            let book = action.book;
            let books =  cloneObject(state.books) //clone the current state
            let index = getIndex(quotes, book.id); //find the index of the quote with the quote id passed
            if (index !== -1) {
                books[index]['title'] = book.title;
                books[index]['pages'] = book.pages;
            }
            state = Object.assign({}, state, { books: books});
            return state;
        }

        case DELETE_BOOK:{
            let books =  cloneObject(state.books) //clone the current state
            let index = getIndex(books, action.id); //find the index of the quote with the id passed
            if(index !== -1) books.splice(index, 1);//if yes, undo, remove the QUOTE
            state = Object.assign({}, state, { books: books});
            return state;
        }

        default:
            return state;
    }
};


function cloneObject(object){
    return JSON.parse(JSON.stringify(object));
}

function getIndex(data, id){
    let clone = JSON.parse(JSON.stringify(data));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}

// Combine all the reducers


