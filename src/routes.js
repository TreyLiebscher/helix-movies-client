import React from 'react';
import { Route, Switch } from 'react-router';

// Module root components
import ProfilePage from './components/pages/ProfilePage';
import { StreamingInfoWithData } from './components/StreamingInfo';
import SignupPage from './components/signupPage';
import LogInPage from './components/pages/LogInPage';
import { NavBar } from './components/NavBar';
import NotFoundPage from './components/pages/NotFoundPage';
import HomePage from './components/pages/HomePage';
import AnalyzePage from './components/pages/AnalyzePage';




export default (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/search/:searchString" component={HomePage} />
    <Route exact path="/analyze/:id/:title" component={AnalyzePage} />
    <Route exact path="/streaming/:title" component={StreamingInfoWithData} />
    <Route exact path="/profile/home" component={ProfilePage} />
    <Route exact path="/profile/oneclicksearch" component={ProfilePage} />
    <Route exact path="/signup" component={SignupPage} />
    <Route exact path="/login" component={LogInPage} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
);