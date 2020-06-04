import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Homepage from './pages/homepage/homepage.component'

const HatsPage = () => (
  <div>
    <h1>Hats Hats hats</h1>
  </div>
);

const JacketsPage = () => (
  <div>
    <h1>Jackets</h1>
  </div>
);

function App() {
  return (
    <div>
      <Switch> {/*switch gives us more power to control which page/component we want to route to. If we have multiple route comps in here, it will stop at one as soon as we get a url match */}
        <Route exact path='/' component={Homepage}/> 
        <Route path='/shop/hats' component={HatsPage}/> 
        <Route path='/shop/jackets' component={JacketsPage}/> 
      </Switch>
      
    </div>
  );
}

export default App;
