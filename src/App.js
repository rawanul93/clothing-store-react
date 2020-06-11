import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Homepage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header-component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

const JacketsPage = () => (
  <div>
    <h1>Jackets</h1>
  </div>
);

function App() {
  return (
    <div>
      <Header />
      <Switch> {/*switch gives us more power to control which page/component we want to route to. If we have multiple route comps in here, it will stop at one as soon as we get a url match */}
        <Route exact path='/' component={Homepage}/> 
        <Route exact path='/shop' component={ShopPage}/> 
        <Route exact path='/signin' component={SignInAndSignUpPage}/> 
        <Route exact path='/shop/jackets' component={JacketsPage}/> 
      </Switch>
      
    </div>
  );
}

export default App;
