import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// route components
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import Login from '../ui/Login';
import NotFound from '../ui/NotFound';

export const history = createBrowserHistory();

export const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <PublicRoute path="/" component={Login} exact={true} />
      <PublicRoute path="/signup" component={Signup} />
      <PrivateRoute path="/dashboard" component={Dashboard} exact={true} />
      <PrivateRoute path="/dashboard/:id" component={Dashboard} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);
