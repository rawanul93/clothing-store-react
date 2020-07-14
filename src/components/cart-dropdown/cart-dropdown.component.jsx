import React from 'react'
import './cart-dropdown.styles.scss'


//components
import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'

//selectors
import { createStructuredSelector } from 'reselect'
import { selectCartItems, selectCartHidden } from '../../redux/cart/cart.selectors'

//actions
import { toggleCartHidden } from '../../redux/cart/cart.actions'


//HOC
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapState = createStructuredSelector({
    cartItems: selectCartItems, //using selector here will make sure that the cartItems dropdown will not get rerendered every time the state changes for things that are not related to out cartDropdown
    cartHidden: selectCartHidden
});

const CartDropdown = ({ cartItems, history, dispatch }) => { //dispatch is automatically passed on to here as prop if we dont manually enter a second argument to connect. This is useful for when we just maybe need to fire one action but dont wanna write a whole mapDispatch portion for just one action.
    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {cartItems && cartItems.length ? //if items exist render items, if not render empty message
                    cartItems.map(item => 
                        <CartItem key={item.id} item={item}/>
                    )
                    : <span className='empty-message'>Your cart is empty</span>
                }
            </div>
            <CustomButton onClick={() => {
                history.push('/checkout');
                dispatch(toggleCartHidden());
            }
          }>GO TO CHECKOUT</CustomButton>
        </div>
    )
}

export default withRouter(connect(mapState)(CartDropdown));

