import CartActionTypes from './cart.types';
import { addItemToCart } from './cart.utils';

const INITIAL_STATE = {
    hidden: true, //to display the cart dropdown
    cartItems: [] //all the items added in the cart
}

const cartReducer =(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden //just setting the opposite of hidden which is initially true when the app is mounted for the first time.
            };
        case CartActionTypes.ADD_ITEM:
            
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload) //payload will contain the cart item that the user will add.
            };
        default:
            return state;
    }
}

export default cartReducer;