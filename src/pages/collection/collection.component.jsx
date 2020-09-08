import React from 'react';
import './collection.styles.scss';

//redux
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { selectCollection } from '../../redux/shop/shop.selector';

//components
import CollectionItem from '../../components/collection-item/collection-item.component';


const CollectionPage = ({ collection }) => { //note we get the collection from redux.
    const { title, items } = collection;
        return (
        <div className='collection-page'>
            <h2 className='title'>{title}</h2>
            <div className='items'>
            { 
                items.map(item => (
                    <CollectionItem key={item.id} item={item}/>
                ))
            }
            
            </div>
           
        </div>
    )
}

const mapState = (state, ownProps) => ({ //ownProps is what this component gets as its own props. We'll use the route props we get here.
    collection: selectCollection(ownProps.match.params.collectionId)(state) //the selectCollection returns us a createSelector which requires us to pass it the state. After, the state is passed to the createSelector it resolves itself by passing the state to another selector which we defined and ultimately get the collection state from our selectCollection.
})


export default connect(mapState)(CollectionPage);
