import { applyMiddleware, createStore } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { configureStore } from '@reduxjs/toolkit'
// import {reduxImmutableStateInvariant} from "reduxImmutableStateInvariant";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import rootReducer from './reducers'

const initialState = {
    
}

// const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default
let enhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducer,initialState,enhancer)
export default store
