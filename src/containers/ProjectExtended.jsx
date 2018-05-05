import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { Item, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import ProjectPicture from '../images/project.png';

import { fetchProject } from '../actions/projects';

// TODO get rid of item, display issues, do proptypes
class ProjectExtended extends Component {
	componentWillMount() {
		const {match: {params: {id}}} = this.props;
		if (id) this.props.fetchProject(id, this.props.token);
		
	}
  render() {
    return (
			<div>
				<Link href="/projects" to="/projects">Go back to Projects Page</Link>
				<Loader active={!this.props.selectedProject} content="Fetching project" />
				{this.props.selectedProject && (
					<Item.Group className="project">
						<Item>
							<Item.Image size="small" src={ProjectPicture} />
							<Item.Content>
								<Item.Header>{this.props.selectedProject.name}</Item.Header>
							</Item.Content>
						</Item>
					</Item.Group>
				)}
			</div>
    );
  }
}

ProjectExtended.propTypes = {
	// selectedProject: PropTypes.shape({

	// })
}

const mapStateToProps = (state) => {
	console.log('state', state);
	return {
		selectedProject: state.projects.selectedProject, 
		token: (state.auth && state.auth.access && state.auth.access.token) ? state.auth.access.token : null,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchProject: (id, token) => dispatch(fetchProject(id, token)),
	}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectExtended));
