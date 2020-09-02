import firebase from 'firebase/app' //pulling the firebase utility library
import 'firebase/firestore'; //this is for the database
import 'firebase/auth';

const config ={
    apiKey: "AIzaSyCakwXUh4D0QsmyGgkVpwx9Xe7-nD9oqkQ",
    authDomain: "ecommerce-ceefa.firebaseapp.com",
    databaseURL: "https://ecommerce-ceefa.firebaseio.com",
    projectId: "ecommerce-ceefa",
    storageBucket: "ecommerce-ceefa.appspot.com",
    messagingSenderId: "205064410964",
    appId: "1:205064410964:web:41529b066e415dd2691ac1",
    measurementId: "G-XKDYZBPWW9"
}

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => { //when we sign in with google, we get a user object in return. This function will make use of that returned object and add it to our users collection in our firebase
    if(!userAuth) return; //when the user signs out we actually get a null. So we're saying that if we get a null i.e. when the userAuth doesnt exist, we'll return and exit this function
    
    const userRef = firestore.doc(`users/${userAuth.uid}`); //getting the reference for the user doc in the users collection in our database.
    const snapShot = await userRef.get(); //this executes the above query and gives us actual data regarding the document. It will return something even if the document being referenced doesnt exist. 

    if(!snapShot.exists) { //the snapshot has a property called exists which is true if such a doc exists in our firestore and vice versa.
        const { displayName, email } = userAuth; //if it doesnt exist we'll still get that userAuth object of the user that signed in with google. So from that object we'll get the email and the displayName too.
        const createdAt = new Date();
        
        try {
            await userRef.set({ //set writes to the document referred to by the userRef. If it doesnt exist yet, it creates it for us.
                displayName,
                email,
                createdAt,
                ...additionalData
            }) 
            
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }
    return userRef; //we're returning this because we might need it for something more than just creating it.
}

export const addCollectionsAndDocuments = async (collectionKey, objectsToAdd) => { //to add data into our firebase, specifically the collections data in this case.
    const collectionRef = firestore.collection(collectionKey); //name of the collection will be 'collection'. Bit confusing because of how we named our list of shop data 'collections'.

    const batch = firestore.batch(); //we will use the batch here because each .set method is run one at a time. We cannot give it an array of collections and tell firebase to create all the docs for each all at once. It will do it one at a time. For any reason if one of these fail, we want all of it to fail so that we can actually understand what happeneded rather than having a few data missing and not knowing what went wrong.  
    
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc() //gives us a new document ref in this collection and randoly generates an id for us. We could write it like .doc('name') and this way the id will be set as the string we pass into this.
        batch.set(newDocRef, obj) //basically doing newDocRef.set(obj) but in batches
    });

    return await batch.commit(); //this will fire off the batch call. What it returns is a promise, when commit succeeds it resolves a void value.
}

export const auth = firebase.auth(); //exporting the auth and the firestore to later import whereever we may need it.
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); //google auth utility. This gives us access to the google auth class from firebase's auth library
provider.setCustomParameters({ prompt: 'select_account' }); //it takes custom params. Here this means that we always want to trigger the google sign in popup whenever we use the googleAuthProvider when we sign in or sign up

export const signInWithGoogle = () => auth.signInWithPopup(provider); //this gives us the actual popup for when we sign in with google.

export default firebase;