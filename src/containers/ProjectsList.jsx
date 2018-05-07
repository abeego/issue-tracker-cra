import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader, Modal, Form, Icon, Message } from 'semantic-ui-react';

import { getProjectsList, createProject } from '../actions/projects';

import Project from '../components/Project';

// TODO modal in new component
// TODO each field in separate line 

class ProjectsList extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			modalOpened: false, 
			name: '',
			description: '',
			error: null,
			createdProject: null,
		};
	}

	componentDidMount() {
		this.props.getProjectsList(this.props.token);
	}

	componentWillReceiveProps = (newProps) => {
		console.log('newProps in project ', newProps, newProps.errors);
		if (newProps.error && newProps.error.length && newProps.error !== this.state.error) {
			this.setState({ error: newProps.error[0] });
		} else if (this.state.error && !newProps.error) {
			this.setState({ error: null });
		}

		if ( (!this.props.createdProject && newProps.createdProject)
			|| (newProps.createdProject && newProps.createdProject.name 
				&& this.props.createdProject.name !== newProps.createdProject.name)) {
			this.setState({ createdProject: newProps.createdProject });
			this.props.getProjectsList();
		}
	}

	openModal = () => {
		this.setState({ modalOpened: true });
	}

	createProject = (e) => {
		e.preventDefault();
		const { name, description } = this.state;
		// TODO validation? 
		if (name && description) {
			this.props.createProject(name, description, this.props.token);
			// TODO ceck for success and than close 
			// otherwise throw error
		}
	}

	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value });
	}

	closeModal = () => {
		this.setState({ modalOpened: false });
	}

	render() {
		return (
			<React.Fragment>
				<a onClick={this.openModal}>CREATE NEW PROJECT</a>
				<h2>List of projects</h2>
				<div className="projects">
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
					<Modal open={this.state.modalOpened} >
						<Modal.Header>Create new project
							<Icon
								name="remove" 
								style={{ float: 'right'}}
								onClick={this.closeModal}
							/>
						</Modal.Header>
						<Modal.Content>
							<Form  onClick={this.createProject}>
								<Form.Group >
									<Form.Input 
										required 
										label="Project name" 
										name="name" 
										value={this.state.name}
										placeholder="Project name" 
										onChange={this.handleChange}
									/>
									<Form.TextArea 
										required 
										label="Project description" 
										name="description" 
										value={this.state.description}
										placeholder="Project description" 
										onChange={this.handleChange}
									/>
									{this.state.error && (
										<div>{this.state.error} </div>
									)}
									{this.state.createdProject && (
										<div>{`Project ${this.state.createdProject.name} created`}</div>
									)}
									<Form.Button content='Cancel' onClick={this.closeModal} />
									<Form.Button content='Submit' />
								</Form.Group>
							</Form>
						</Modal.Content>
					</Modal>
				</div>
			</React.Fragment>
		);
	}
}

ProjectsList.propTypes = {
	getProjectsList: PropTypes.func,
	token: PropTypes.string,
	projectsList: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
	token: (state.auth && state.auth.access && state.auth.access.token)
		? state.auth.access.token
		: null,
	projectsList: state.projects.projectsList,
	error: state.projects.errors,
	createdProject: state.projects.createdProject,
});

const mapDispatchToProps = dispatch => ({
	getProjectsList: token => dispatch(getProjectsList(token)),
	createProject: (name, description, token) => dispatch(createProject(name, description, token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
