import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollection = memoize((collectionUrlParam) =>  //we pass in the url Params which we use to get which collection to pull off.
    createSelector(
        [selectCollections],
        collections => collections[collectionUrlParam] //object notation. We onverted our shop data from an array to an object so that its easier to find the collection we want rather than using collections.find on the array..
    )
)

export const selectCollectionsForPreview = createSelector( //to convert object to an array so that our CollectionPreview component can use it.
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key]) //gets us all of the keys of an object that we give it and returns us that in an array format.
    //so here we're first doing Object.keys to get an array with just the keys which would look like [hats, sneakers, jackets, womens, mens].
    //then we're gonna map over it but return a new array using the map. We're doing object notation and doing collection[key] which will go get the collection where the key matches, e.g. hats collection, sneakers collection etc and therefore store it in as each array element everytime we loop over a key.
)

