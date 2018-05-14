import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as reducers from '../reducers';

const Home = ({ isAuthenticated }) => (
	<div>
		<h2>
			Welcome!
		</h2>
		{isAuthenticated
			? <Redirect to="/projects" />
			: (
				<div>
					<Link href="/login" to="/login">Log in</Link>
					<Link href="/register" to="/register">Sign in</Link>
				</div>
			)
		}
	</div>
);

Home.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
	isAuthenticated: reducers.isAuthenticated(state),
});

export default connect(mapStateToProps, {})(Home);
