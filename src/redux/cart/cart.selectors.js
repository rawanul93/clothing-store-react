import { createSelector } from 'reselect';

//input selector only returns a piece of the state.
const selectCart = state => state.cart; //gets a slice of the state. Usually one layer deep.

//basically first we're getting the slice of the state, which is the entire cart as done above via the input selector.
//Now we will get the cartItems from our selectCart (which is state.cart), and store it as selectCartItems.
//Doing it this way makes selectCartItems a memoized  selector.
//We can use the same method to get deeper slices of state.
export const selectCartItems = createSelector( //using the createSelector makes it a memoized selector
    [selectCart],
    (cart) => cart.cartItems //function that will return the value we want from this selector. In this case we're getting the cartItems now from cart.
); 

export const selectCartItemsCount = createSelector(
    [selectCartItems], //has cartItems which we got from selectCart selector and now will pass to second argument to calculate our itemCount.
    (cartItems) => cartItems.reduce((acc, item) => acc + item.quantity, 0) //this returing the itemCount as a memoized selector called selectCartItemsCount
);

export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((acc, item) => acc + item.quantity*item.price, 0)
);