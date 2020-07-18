import React from 'react'
import './checkout.styles.scss'

//redux, actions and selectors
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';

//components
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';


const mapState = createStructuredSelector({ //this automatically passes in the state to the selectors here
    cartItems: selectCartItems,
    cartTotal: selectCartTotal
})

const CheckoutPage = ({ cartItems, cartTotal }) => {
    return (
        <div className='checkout-page'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map(cartItem => 
                    <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                )
            }

            <div className='total'>
                <span>TOTAL: ${cartTotal}</span>
                <div className='test-warning'>*Please use the following test credit card for payments*
                    <br/>
                    4242 4242 4242 4242 - Exp: 01/2021 - CCV: 123
                </div>
                <StripeCheckoutButton price={cartTotal}/>
            </div>
            
        </div>
    )
}

export default connect(mapState, null)(CheckoutPage);
