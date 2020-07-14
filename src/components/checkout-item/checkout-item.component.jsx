import React from 'react';
import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem: { name, imageUrl, price, quantity }}) => { //passing in the whole cartItem because thats how we structured our addItem action which takes the whole item
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item' />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>{quantity}</span>
            <span className='price'>{price}</span>
            <div className='remove-button'>&#10005;</div> {/*this is just the X icon and its a UTF-8 extra which the browser recognizes as an icon. So writing it this way gives us an icon very easily*/}
        </div>
    )
}

export default CheckoutItem;
