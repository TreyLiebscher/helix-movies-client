import React, { Component } from 'react';
import './App.css';
import routes from './routes'
import NavBarWithData from './components/NavBar';
import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="main-wrapper">
        
        <NavBarWithData />
        
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