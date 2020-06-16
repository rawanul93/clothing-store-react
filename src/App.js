import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';

import Homepage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header-component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { auth } from './firebase/firebase.utils'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }

  unSubscribeFromAuth = null; //were setting a property. We need this because since onAuthStateChanged is an open connection, we need to close it whenever the component unmounts.

  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged(user => { //this is a method on the auth library that we get from firebase. Inside this it takes a function where the parameter is what the user state is of the auth in our firebase project. So we can set currentUser state to this user who is logged in.
      //the onAuthStateChanged is an open connection between our app and firebase. Its a listener where whenever anything in the firebase regarding auth changes, like sign in with another account, signing out etc. It will call this function and do whatver we tell it to do here.
      this.setState({ currentUser: user })
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
