import React from 'react';
import { Route, Switch } from 'react-router';

// Module root components
import { HomePageWithData } from './components/pages/HomePage';
import { AnalyzePageWithData } from './components/pages/AnalyzePage';
import { StreamingInfoWithData } from './components/StreamingInfo';
import NotFoundPage from './components/pages/NotFoundPage';


export default (
  <Switch>
    <Route exact path="/" component={HomePageWithData} />
    <Route path="/search/:searchString" component={HomePageWithData} />
    <Route exact path="/analyze/:id/:title" component={AnalyzePageWithData} />
    <Route exact path="/streaming/:title" component={StreamingInfoWithData} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
);