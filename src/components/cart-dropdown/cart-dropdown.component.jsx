import React from 'react'
import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'

import './cart-dropdown.styles.scss'

import { connect } from 'react-redux';

const mapState = ({ cart: { cartItems } }) => ({
    cartItems
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

