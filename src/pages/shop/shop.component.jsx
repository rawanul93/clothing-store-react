import React from 'react';

import { Route } from 'react-router-dom';

//components
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

const ShopPage = ({ match }) => { //match.path gives us the the address is on the browser. That is what we're pushing to our history as well whenever a user clicks on shop.
   console.log(match);
    return (
        <div className='shop-page'>
            <Route exact path={`${match.path}`} component={CollectionsOverview}/>
            <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
        </div>
    )
}

export default ShopPage;