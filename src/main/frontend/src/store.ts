import { createStore, configureStore, ThunkAction, Action, applyMiddleware, Store } from '@reduxjs/toolkit';
import RootReducer from './reducers/RootReducer';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;