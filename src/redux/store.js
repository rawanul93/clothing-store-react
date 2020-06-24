import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'; //helps us debug

import rootReducer from './root-reducer';

const middlewares = [logger]; //since applyMiddleware takes only one argument, we want to put it in an array and spread it out instead so that its more scalable.

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;