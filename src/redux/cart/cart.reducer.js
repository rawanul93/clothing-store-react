import CartActionTypes from './cart.types';

const INITIAL_STATE = {
    hidden: true
}

const cartReducer =(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden //just setting the opposite of hidden which is initially true when the app is mounted for the first time.
            }
        default:
            return {state}
    }
}

export default cartReducer;