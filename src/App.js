import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import Navigation from './Components/Navigation';
import { ProtectedRoute } from './utils/protectedRoute';

import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Collection from './Components/Collections';

function App() {
  return (
    // <Router>
      <div className="App">
        {/* <Navigation /> */}
        {/* <Home/> */}
        {/* <Routes> */}
        <Switch>
          <Route path="/" exact name="login" component={Login} />
          <Route path="/login" name="login" exact component={Login} />
          <Route path="/signup" exact name="signup" component={Signup} />
          <div className="other">
            <ProtectedRoute path="/home" exact component={Home} />
            <ProtectedRoute path="/collection" exact component={Collection} />
            <Route path="*" component={() => "404 NOT FOUND" } />
          </div>
        </Switch>
        {/* </Routes> */}
      </div>
    // </Router>
  );
}

export default App;
