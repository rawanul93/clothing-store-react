import ShopActionTypes from "./shop.types";
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
})

export const fetchCollectionSuccess = (collectionsMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})


export const fetchCollectionFailure = (errorMessage) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

export const fetchCollectionStartAsync = () => { //this is the actual function we pass to our components to start fetching the collections data.
    return dispatch => {
        const collectionRef = firestore.collection('collections');

        //this will switch our isFetching state to true
        dispatch(fetchCollectionStart()); //so because of thunks we can dispatch an action within this action.

        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionSuccess(collectionsMap));
        }).catch(error => dispatch(fetchCollectionFailure(error.message)))

        //the above code is writting using promise chaining. This below is using a observer pattern.
        // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => { //sets a listener on our collections collection. Whenever something in here updates or whenever this code runs for the first time, this will return us the snapshot object of the collectionRef.
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     updateCollections(collectionsMap);
        //     this.setState({
        //         loading: false
        //     })
        // }) 
    }
}

