import { combineReducers } from 'redux';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' //this is the actual localStorage object. We're bascially telling redux-persist that we wanna use our local storage to persist .

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';


const persistConfig = {
    key: 'root', //at what point in our reducer object we want to store everything. We want to start at the root.
    storage, //localStorage.
    whitelist: ['cart'] //this is an array of the reducers that we want to store in our localStorage.
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);