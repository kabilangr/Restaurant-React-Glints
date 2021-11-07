import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from './Components/Navigation';

import Home from "./Components/Home";
import Collection from './Components/Collections';

function App() {
  return (
    // <Router>
      <div className="App">
        <Navigation />
        {/* <Home/> */}
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/home" exact element={<Home/>} />
          <Route path="/collection" exact element={<Collection/>} />
        </Routes>
      </div>
    // </Router>
  );
}

export default App;
