import React from 'react';
import { connect } from 'react-redux'
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const mapState = (state) => ({
    itemCount: selectCartItemsCount(state) //so we're passing the whole state. The selectCartItemsCount references the selectCartItems selector, which then references selectCart where finally this state is passed on to. The selectCart gets cart from the state and then selectCartItems uses that to get cartItems and that is memoized. Then selectCartItemsCount uses cartItems and calculates the itemCount and returns it for us. This is also memoized.

    // itemCount: cartItems.reduce((acc, item) => acc + item.quantity, 0) //reduce method. Here acc is the accumulated value that we set to 0 initially. For each item it will add the quantiy number to it until its finished.
    //this is called a Selector. Because we are getting the whole state object and pulling off a small portion/slice from that state. Like getting the cart from state, then the cartItems and then reducing over indivisual items to compute a new value based off of the state.
    //whenever any reducer updates, we are always returning an updated state. The update may not be related to cart in this case, but still we are actually returning a brand new state object with the both updated parts and non updated parts and thus mapState is called every single time. Even if the values and data in the state are the exact same as before for non updated slices, overall the state is always a brand new object that we're getting from any reducer update. So for each reducer update, even ones not related to this, we'll still end up up running this reduce function in mapState and our reduce function will not know that our cartItems coming in may be the exact same, so it will run and cause renrendering the component every time. This can cause performance issues. 
    //this is not good for performance, because we dont want to rerender our component every time the state changes and especially if those state changes dont actually modify the parts of the state that our component cares about.
})

const mapDispatch = (dispatch) => (
    {
        toggleCartHidden: () => dispatch(toggleCartHidden())
    }
)

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{itemCount}</span>
    </div>
)

export default connect(mapState, mapDispatch)(CartIcon);