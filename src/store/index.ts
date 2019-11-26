import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { searchReducer } from './reducers/searchReducer';
import { storage } from './middlewares/storage';
import storageModule from 'store2';
import { state } from './state';
import { STORE_NAME } from '../utils';

const preloadedState = (storageModule.has(STORE_NAME)) ? storageModule.get(STORE_NAME) : state;

export const store = configureStore({
    reducer: searchReducer,
    middleware: [...getDefaultMiddleware(), storage],
    preloadedState
});