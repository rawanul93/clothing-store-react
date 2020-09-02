import React from 'react';

import { Route } from 'react-router-dom';
//redux
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';

//firestore
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

//components
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

class ShopPage extends React.Component { //match.path gives us the the address is on the browser. That is what we're pushing to our history as well whenever a user clicks on shop.
   
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;

        const collectionRef = firestore.collection('collections'); //getting the collection ref.
        
        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => { //sets a listener on our collections collection. Whenever something in here updates or whenever this code runs for the first time, this will return us the snapshot object of the collectionRef.
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
        }) 
    }

   render() {
       const { match } = this.props;
       return (
        <div className='shop-page'>
            <Route exact path={`${match.path}`} component={CollectionsOverview}/>
            <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
        </div>
       )
    
   }
    
}

const mapDispatch = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap)) //UpdateCollections will now be available as a prop and it is simply a function that takes in collectionMap (which we get from firebaseUtils and pass to it when component mounts) and then dispatches our action also called updateCollection where we pass in this collectionsMap object. This action fires off and our shop reducer updates the collections state with this collectionsMap we get from firebase.
})

export default connect(null, mapDispatch)(ShopPage);