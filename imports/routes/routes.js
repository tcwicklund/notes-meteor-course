import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

// route components
import Signup from '/imports/ui/Signup';
import Dashboard from '/imports/ui/Dashboard';
import Login from '/imports/ui/Login';
import NotFound from '/imports/ui/NotFound';

export const browserHistory = createBrowserHistory();

const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/dashboard'];
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/dashboard');
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};
const onEnterNotePage = (nextState) => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  } else {
    Session.set('selectedNoteId', nextState.match.params.id);
  }
};


export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" render={() => {
        onEnterPublicPage();
        return <Login/>;
      }}/>
      <Route path="/signup" render={() => {
        onEnterPublicPage();
        return <Signup/>;
      }}/>
      <Route path="/dashboard/:id" render={(props) => {
        onEnterNotePage(props);
        return <Dashboard/>;
      }}/>
      <Route path="/dashboard" render={() => {
        onEnterPrivatePage();
        return <Dashboard/>;
      }}/>
      <Route render={() => <NotFound/>}/>
    </Switch>
  </Router>
);

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isAuthenticated && isUnauthenticatedPage) {
    browserHistory.replace('/dashboard');
  } else if (!isAuthenticated && isAuthenticatedPage) {
    browserHistory.replace('/');
  }
};
