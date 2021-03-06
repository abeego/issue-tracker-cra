import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as reducers from '../reducers';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
	<Route
		{...rest}
		render={props => (
			isAuthenticated ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/',
						state: { from: props.location },
					}}
				/>
			)
		)}
	/>
);
const mapStateToProps = state => ({
	isAuthenticated: reducers.isAuthenticated(state),
});

PrivateRoute.propTypes = {
	component: PropTypes.func,
	isAuthenticated: PropTypes.bool,
	location: PropTypes.shape({
		hash: PropTypes.string,
		pathname: PropTypes.string,
	}),
};

export default withRouter(connect(mapStateToProps, null)(PrivateRoute));

