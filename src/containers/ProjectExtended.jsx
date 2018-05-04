import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Item, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import ProjectPicture from '../images/project.png';

import { fetchProject } from '../actions/projects';


class ProjectExtended extends Component {
	componentWillMount() {
		console.log('history?', this.props.history);
		
	}
  render() {
    return (
			<div>
				{!this.props.selectedProject && (
					<Loader />
				)}
				{this.props.selectedProject && (
					<Item.Group className="project">
						<Item>
							<Item.Image size="small" src={ProjectPicture} />
							<Item.Content>
								<Item.Header>{this.selectedProject.name}</Item.Header>
								<Item.Meta>Description:</Item.Meta>
								<Item.Description>{this.selectedProject.description}</Item.Description>
								<Item.Meta>Created:</Item.Meta>
								<Item.Description>{this.selectedProject.created_at}</Item.Description>
							</Item.Content>
						</Item>
					</Item.Group>
				)}
			</div>
    );
  }
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		selectedProject: state.selectedProject, 
		token: (state.auth && state.auth.access && state.auth.access.token) ? state.auth.access.token : null,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchProject: (id, token) => dispatch(fetchProject(id, token)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectExtended);
