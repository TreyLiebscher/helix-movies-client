import React from 'react';
import './app.css';
import Navbar from './navbar';
import SearchSection from './search';
import Profile from './profile';

export default class App extends React.Component {
  render() {
    return (
        <div className="app">
            <Navbar />
            <SearchSection />
            <Profile />
        </div>
    );
  }
}

