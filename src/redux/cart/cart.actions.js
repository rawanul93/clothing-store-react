import CartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN //dont need to pass in the payload in this case. Payload is optional.
});

export const addCartItem = item => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
})

export const clearCartItem = item => ({
    type: CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item
})

export const removeItem = item => ({
    type: CartActionTypes.REMOVE_ITEM,
    payload: item
})