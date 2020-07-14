import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'; //helps us debug
import { persistStore } from 'redux-persist'; //helps us cache our store based on whatever config we set for it.

import rootReducer from './root-reducer';

const middlewares = [logger]; //since applyMiddleware takes only one argument, we want to put it in an array and spread it out instead so that its more scalable.

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store); //its just a persisted version of our store.

export default {store, persistor};