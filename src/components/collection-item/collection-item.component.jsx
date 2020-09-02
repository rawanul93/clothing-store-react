import React from 'react';
import { connect } from 'react-redux';
import './collection.item.style.scss';

import CustomButton from '../custom-button/custom-button.component';

import { addCartItem } from '../../redux/cart/cart.actions';

const mapDispatch = dispatch => ({
    addCartItem: item => dispatch(addCartItem(item))
})

const CollectionItem = ({ item, addCartItem }) => {
    const { name, price, imageUrl } = item;
    return (
        <div className='collection-item'>
            <div className='image' style={{backgroundImage:`url(${imageUrl})`}}>
            
            </div>
            <div className='collection-footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <CustomButton className='custom-button' type='button' inverted onClick={() => addCartItem(item)}> Add to Cart </CustomButton>
            
        </div>
    )
}

export default connect(null, mapDispatch)(CollectionItem);
