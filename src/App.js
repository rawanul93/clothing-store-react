import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';

import Homepage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header-component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }

  unSubscribeFromAuth = null; //were setting a property. We need this because since onAuthStateChanged is an open connection, we need to close it whenever the component unmounts.

  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged( async userAuth => { //this is a method on the auth library that we get from firebase. Inside this it takes a function where the parameter is what the user state is of the auth in our firebase project. So we can set currentUser state to this user who is logged in.
       //the onAuthStateChanged is an open connection between our app and firebase. Its a listener where whenever anything in the firebase regarding auth changes, like sign in with another account, signing out etc. It will call this function and do whatver we tell it to do here.
       //createUserProfileDocument(user); //this is creating the actual document and adding it in our firebase.
    
      if(userAuth) { //userAuth only exists when a user signs in. (with google or also with email and password). Becomes null when they signOut. But the onAuthStateChanged still runs cause auth state did change since user signed out. We want to create new user document in firebase only when someone new signs in.
        const userRef = await createUserProfileDocument(userAuth); //so we'll run this anytime a user signs in. In this function in our code we made sure that the actual creation of any firebase document occurs only for new users. So even if we run this for existing users, we get the returned documentRef from which we can get the snapShot that gets us the data we need.
        userRef.onSnapshot(snapShot => { //onSnapshot() gives us the doc snapshot with all the data related to a new user sign in or a existing users sign ini
          this.setState({
            currentUser: {
              id: snapShot.id, //that is how the id is stored.
              ...snapShot.data() //the .data() is what gives us the actual data.
            }
          })
          // console.log(this.state);
        });
        this.setState({currentUser: userAuth});
      }
      else {
        this.setState({ currentUser: null }) //making sure we clear local state of auth when user signs out and userAuth is null.
      }
    })
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth(); //calling this back closes the connection.
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch> {/*switch gives us more power to control which page/component we want to route to. If we have multiple route comps in here, it will stop at one as soon as we get a url match */}
          <Route exact path='/' component={Homepage}/> 
          <Route exact path='/shop' component={ShopPage}/> 
          <Route exact path='/signin' component={SignInAndSignUpPage}/> 
        </Switch>
        
      </div>
  );
  }
  
}

export default App;
