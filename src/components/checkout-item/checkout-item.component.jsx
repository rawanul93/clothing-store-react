import React from 'react';
import './checkout-item.styles.scss';

//redux, actions
import { connect } from 'react-redux';
import { clearCartItem, addCartItem, removeItem } from '../../redux/cart/cart.actions';

const mapDispatch = dispatch => ({
    clearItem: item => dispatch(clearCartItem(item)),
    addItem: item => dispatch(addCartItem(item)),
    removeItem: item => dispatch(removeItem(item))
})

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => { //passing in the whole cartItem because thats how we structured our addItem action which takes the whole item
    const { name, imageUrl, price, quantity } = cartItem;
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item' />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={() => removeItem(cartItem)}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={() => addItem(cartItem)}>&#10095;</div>
                </span>
            <span className='price'>{price}</span>
            <div onClick={() => clearItem(cartItem)} className='remove-button'>&#10005;</div> {/*this is just the X icon and its a UTF-8 extra which the browser recognizes as an icon. So writing it this way gives us an icon very easily*/}
        </div>
    )
}

export default connect(null, mapDispatch)(CheckoutItem);
