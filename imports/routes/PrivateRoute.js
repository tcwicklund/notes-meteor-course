import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route {...rest} render={(props) => (
    isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  )} />
);

export default withTracker(() => ({
  isAuthenticated: !!Meteor.userId()
}))(PrivateRoute);
