import React from 'react'
import './collections-overview.styles.scss'

//redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selector';

//components
import CollectionPreview from '../collection-preview/collection-preview.component';

const mapState = createStructuredSelector({
    collections: selectCollectionsForPreview
})

const CollectionsOverview = ({ collections }) => {
    return (
        <div className='collections-overview'>
            {
                collections.map(({id, ...otherCollectionProps}) => (
                    <CollectionPreview key={id} {...otherCollectionProps}/>
                ))
            }
        </div>
    )
}

export default connect(mapState)(CollectionsOverview);