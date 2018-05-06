import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import RegisterUserInput from '../components/RegisterUserInput';
import { register } from '../actions/auth';
import { authErrors, isAuthenticated } from '../reducers';

const Register = (props) => {
	if (props.isAuthenticated) {
		return (<Redirect to="/" />);
	}
	return (
		<RegisterUserInput {...props} />
	);
};

Register.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
	errors: authErrors(state),
	isAuthenticated: isAuthenticated(state),
	newUser: state.auth.newUser,
});

const mapDispatchToProps = dispatch => ({
	onSubmit: (username, email, password) => dispatch(register(username, email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
