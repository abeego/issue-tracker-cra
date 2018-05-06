import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';

import { getProjectsList } from '../actions/projects';
import { logout } from '../actions/auth';

import Project from '../components/Project';

class ProjectsList extends Component {
	componentDidMount() {
		this.props.getProjectsList(this.props.token);
	}

	render() {
		return (
      <div className="projects">
        <h2>List of projects</h2>
        <Loader active={!this.props.projectsList} size="big" />
        {this.props.projectsList
          && this.props.projectsList
          && this.props.projectsList.map(project => (
            <Project
              key={project.name}
              project={project}
            />
          ))
				}
			</div>
		);
	}
}

ProjectsList.propTypes = {
	getProjectsList: PropTypes.func,
	logout: PropTypes.func,
	token: PropTypes.string,
	projectsList: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
	token: (state.auth && state.auth.access && state.auth.access.token)
		? state.auth.access.token
		: null,
	projectsList: state.projects.projectsList,
});

const mapDispatchToProps = dispatch => ({
	getProjectsList: token => dispatch(getProjectsList(token)),
	logout: () => dispatch(logout()),
	// addProject
});
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
