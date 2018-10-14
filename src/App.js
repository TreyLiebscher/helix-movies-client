import React, { Component } from 'react';
import './App.css';
import routes from './routes'
import NavBar from './components/NavBar';
import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <div>
          <Router>
            <div>
              <NavBar />    
              {routes}
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;