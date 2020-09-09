import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom' // rendering a redirect will navigate to a new page. Redirect will navigate to a new location. The new location will override the current location in the history stack.
import { connect } from 'react-redux';

import './App.css';

//components and pages
import Homepage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header-component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout/checkout.component';

//firebase and redux
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions';

//selectors
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from './redux/user/user.selectors';
//import { selectCollectionsForPreview } from './redux/shop/shop.selector';


const mapState = createStructuredSelector ({ 
  currentUser: selectCurrentUser,
})

const mapDispatch = dispatch => ({ 
  setCurrentUser: user => dispatch(setCurrentUser(user)) //gets the user object and then calls dispatch. Dispatch is a way for redux to know that whatever youre passing is an action object we're passing in to each and every reducer. The reducers get this action and then checks against the type and makes changes accordingly.
  //so setCurrentUser which we'll get as props now is a function which receives a user object.This function calls dispatch which we get from react redux. Dispatch will dispatch the action function (also called setCurrentUser) which we import from our userActions and pass in the user which gets updated to the state in userReducer
})

class App extends React.Component {

  unSubscribeFromAuth = null; //were setting a property. We need this because since onAuthStateChanged is an open connection, we need to close it whenever the component unmounts.

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unSubscribeFromAuth = auth.onAuthStateChanged( async userAuth => { //this is a method on the auth library that we get from firebase. Inside this it takes a function where the parameter is what the user state is of the auth in our firebase project. So we can set currentUser state to this user who is logged in.
       //the onAuthStateChanged is an open connection between our app and firebase. Its a listener where whenever anything in the firebase regarding auth changes, like sign in with another account, signing out etc. It will call this function and do whatver we tell it to do here.
       //createUserProfileDocument(user); //this is creating the actual document and adding it in our firebase.
      
       if(userAuth) { //userAuth only exists when a user signs in. (with google or also with email and password). Becomes null when they signOut. But the onAuthStateChanged still runs cause auth state did change since user signed out. We want to create new user document in firebase only when someone new signs in.
        const userRef = await createUserProfileDocument(userAuth); //so we'll run this anytime a user signs in. In this function in our code we made sure that the actual creation of any firebase document occurs only for new users. So even if we run this for existing users, we get the returned documentRef from which we can get the snapShot that gets us the data we need.
        
        userRef.onSnapshot(snapShot => { //onSnapshot() is a listener that gives us the doc snapshot whenever the document snapshot updates (set a new value or updated an old value or deleted), with all the data related to a new user sign in or a existing user signed in.
          setCurrentUser({
            id: snapShot.id, //that is how the id is stored.
            ...snapShot.data() //the .data() is what gives us the actual data.
          })
        });
      }
      else {
        setCurrentUser(userAuth); // we do this here as well because onAuthChange runs both for signing in and out. The first setCurrent user is for when user signs in and the if statement runs. The second one is when someone signs out and userAuth is null. We still want to update the state with that.
      }
    }) //,error => console.log(error) we can write this here to handle any errors.

   // addCollectionsAndDocuments('collections', collectionsArray.map(({title, items}) => ({ title, items }))); //the second arg we're passing is destructoring title and items from each collection element like hats, shoes etc, and returning an array with just the titles and the items instead of other data which we dont even need.

  }

  componentWillUnmount() {
    this.unSubscribeFromAuth(); //calling this back closes the connection.
  }

  render() {
    return (
      <div>
        <Header />
        <Switch> {/*switch gives us more power to control which page/component we want to route to. If we have multiple route comps in here, it will stop at one as soon as we get a url match */}
          <Route exact path='/' component={Homepage}/> 
          <Route path='/shop' component={ShopPage}/> 
          <Route exact path='/checkout' component={CheckoutPage}/>
          <Route exact path='/signin' render={() => this.props.currentUser? (<Redirect to='/'/>) : (<SignInAndSignUpPage />)}/> {/* render is a javascript invocation telling what component to return. It can be a function so we can control what to render. Here were checking if someone is already signed in or not. If so then we wont ever let them access the sign in page. It will always redirect them to home page. */}
        </Switch>
        
      </div>
  );
  }
  
}

export default connect(mapState, mapDispatch)(App);
