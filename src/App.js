import React, { Component } from 'react';
import './App.css';
import routes from './routes'
import {NavBar} from './components/NavBar';
import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="main-wrapper">
        
        <NavBar />
        
        <div>
          {/* main content */}
          <Router>
            
            {routes}
          </Router>
        </div>
      </div>
    );
  }
}

export default App;