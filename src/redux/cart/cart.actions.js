import CartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN //dont need to pass in the payload in this case. Payload is optional.
});

export const addCartItem = item => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
})