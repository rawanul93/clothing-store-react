import React from 'react'
import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'
import { selectCartItems } from '../../redux/cart/cart.selectors'

import './cart-dropdown.styles.scss'

import { connect } from 'react-redux';

const mapState = (state) => ({
    cartItems: selectCartItems(state) //using selector here will make sure that the cartItems dropdown will not get rerendered every time the state changes for things that are not related to out cartDropdown
});

const CartDropdown = ({ cartItems }) => {
    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {cartItems && cartItems.map(item => 
                    <CartItem key={item.id} item={item}/>
                )}
            </div>
            <CustomButton>GO TO CHECKOUT</CustomButton>
        </div>
    )
}

export default connect(mapState, null)(CartDropdown);

