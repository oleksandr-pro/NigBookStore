
import { BOOKS_AVAILABLE, ADD_BOOK, UPDATE_BOOK, DELETE_BOOK } from "../actions/books_actions" //Import the actions types constant we defined in our actions
let dataState = { books: [], loading:true };

export default function booksControl (state = dataState, action={}) {
    switch (action.type) {
        case ADD_BOOK:{
            let books =  cloneObject(state.books) //clone the current state
            books.unshift(action.book); //add the new book to the top
            state = Object.assign({}, state, { books: books});
            return state;
        }
        case BOOKS_AVAILABLE:
            state = Object.assign({}, state, { books: action.books, loading:false });
            return state;
        case UPDATE_BOOK:{
            let book = action.book;
            let books =  cloneObject(state.books) //clone the current state
            let index = getIndex(books, book.id); //find the index of the book with the book id passed
            if (index !== -1) {
                books[index]['title'] = book.title;
                books[index]['pages'] = book.pages;
                books[index]['read'] = book.read;
                books[index]['like'] = book.like;
                books[index]['image'] = book.image;
            }
            state = Object.assign({}, state, { books: books});
            return state;
        }
        case DELETE_BOOK:{
            let books =  cloneObject(state.books) //clone the current state
            let index = getIndex(books, action.id); //find the index of the book with the id passed
            if(index !== -1) books.splice(index, 1);//if yes, undo, remove the book
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


