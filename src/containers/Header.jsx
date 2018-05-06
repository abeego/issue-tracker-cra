import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../actions/auth';
import { isAuthenticated } from '../reducers';

class Header extends Component {
	componentWillMount() {
		// TODO fetch user data ???
	}

	render() {
		const { isAuthenticated, logout } = this.props;
		return (
			<div>
				{isAuthenticated && (
					<div className="page-header" >
						<a className="logout-button" onClick={() => logout()}>
								Log out
						</a>
					</div>
				)}
			</div>
		)
	}
};

Header.propTypes = {
	logout: PropTypes.func,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
	isAuthenticated: isAuthenticated(state),
});

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
