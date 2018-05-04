import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import LoginUserInput from '../components/LoginUserInput';
import { login } from '../actions/auth';
import { authErrors, isAuthenticated } from '../reducers';

const Login = (props) => {
  if (props.isAuthenticated) {
    return (<Redirect to="/projects" />);
  }
  return (
    <LoginUserInput {...props} />
  );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  errors: authErrors(state),
  isAuthenticated: isAuthenticated(state),
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (username, password) => dispatch(login(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
