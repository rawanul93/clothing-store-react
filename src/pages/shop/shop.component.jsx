import React from 'react';

import { Route } from 'react-router-dom';
//redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'; 
import { fetchCollectionStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selector';


//components
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
//HOC
import WithSpinner from '../../components/with-spinner/with-spinner.component';

//wrapping our components with our HOC WithSpinner
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview); //so basically WithSpinner(CollectionsOverview) gives us back a functional component (we called 'Spinner'), and we're assigning that to a component we call CollectionsOverviewWithSpinner and now we can pass in the isLoaded prop to this.
const CollectionPageWithSpinner = WithSpinner(CollectionPage); //doing the same for this.

class ShopPage extends React.Component { //match.path gives us the the address is on the browser. That is what we're pushing to our history as well whenever a user clicks on shop.


    componentDidMount() {

        const { fetchCollectionStartAsync } = this.props;
        fetchCollectionStartAsync();
       // const collectionRef = firestore.collection('collections'); //getting the collection ref.
       

    }

   render() {
       const { match, isCollectionFetching } = this.props;
       return (
        <div className='shop-page'>
            <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} /> }/> {/*the props we're sending here are the props we get from Route and we pass it in as otherProps. We need those Route props like match which we give our selector in order to get the collections data*/}
            <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={isCollectionFetching} {...props}/>}/>
        </div>
       )
    
   }
}

const mapState = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching
});

const mapDispatch = dispatch => ({
    fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync())
    // updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap)) //UpdateCollections will now be available as a prop and it is simply a function that takes in collectionMap (which we get from firebaseUtils and pass to it when component mounts) and then dispatches our action also called updateCollection where we pass in this collectionsMap object. This action fires off and our shop reducer updates the collections state with this collectionsMap we get from firebase.
})

export default connect(mapState, mapDispatch)(ShopPage);