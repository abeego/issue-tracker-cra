import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as reducers from '../reducers';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
const mapStateToProps = (state) => {
  console.log(reducers.isAuthenticated(state));
  console.log(state);
  
  
  return {
    isAuthenticated: reducers.isAuthenticated(state),
  }
};
export default withRouter(connect(mapStateToProps, null)(PrivateRoute));