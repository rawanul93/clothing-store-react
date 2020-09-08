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
//HOC
import WithSpinner from '../../components/with-spinner/with-spinner.component';

//wrapping our components with our HOC WithSpinner
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview); //so basically WithSpinner(CollectionsOverview) gives us back a functional component (we called 'Spinner'), and we're assigning that to a component we call CollectionsOverviewWithSpinner and now we can pass in the isLoaded prop to this.
const CollectionPageWithSpinner = WithSpinner(CollectionPage); //doing the same for this.

class ShopPage extends React.Component { //match.path gives us the the address is on the browser. That is what we're pushing to our history as well whenever a user clicks on shop.
   
    state = {
        loading: true
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;

        const collectionRef = firestore.collection('collections'); //getting the collection ref.
       
        //PROMISE style of writing unsubscribeFromSnapshot which is an observable pattern
        // collectionRef.get().then(snapshot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     updateCollections(collectionsMap);
        //     this.setState({
        //         loading: false
        //     })
        // })
        // fetch('https://firestore.googleapis.com/v1/projects/ecommerce-ceefa/databases/(default)/documents/collections')
        //     .then(res => res.json())
        //     .then(collections => console.log(collections));

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => { //sets a listener on our collections collection. Whenever something in here updates or whenever this code runs for the first time, this will return us the snapshot object of the collectionRef.
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({
                loading: false
            })
        }) 
    }

   render() {
       const { match } = this.props;
       return (
        <div className='shop-page'>
            <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={this.state.loading} {...props} /> }/> {/*the props we're sending here are the props we get from Route and we pass it in as otherProps. We need those Route props like match which we give our selector in order to get the collections data*/}
            <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={this.state.loading} {...props}/>}/>
        </div>
       )
    
   }
    
}

const mapDispatch = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap)) //UpdateCollections will now be available as a prop and it is simply a function that takes in collectionMap (which we get from firebaseUtils and pass to it when component mounts) and then dispatches our action also called updateCollection where we pass in this collectionsMap object. This action fires off and our shop reducer updates the collections state with this collectionsMap we get from firebase.
})

export default connect(null, mapDispatch)(ShopPage);