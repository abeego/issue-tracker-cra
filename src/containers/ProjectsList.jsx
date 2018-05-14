import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader, Modal, Form, Icon } from 'semantic-ui-react';

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
		this.props.getProjectsList();
	}

	componentWillReceiveProps = (newProps) => {
		if (newProps.error && newProps.error.length && newProps.error !== this.state.error) {
			this.setState({ error: newProps.error[0] });
		} else if (this.state.error && !newProps.error) {
			this.setState({ error: null });
		}

		if ((!this.props.createdProject && newProps.createdProject)
			|| (newProps.createdProject && newProps.createdProject.name
				&& this.props.createdProject.name !== newProps.createdProject.name)) {
			this.setState({
				createdProject: newProps.createdProject,
				description: '',
				name: '',
			});
			this.props.getProjectsList();
		}
	}

	openModal = () => {
		this.setState({ modalOpened: true });
	}

	createProject = (e) => {
		e.preventDefault();
		const { name, description } = this.state;
		if (name && description) {
			this.props.createProject(name, description);
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
								style={{ float: 'right' }}
								onClick={this.closeModal}
							/>
						</Modal.Header>
						<Modal.Content>
							<Form onClick={this.createProject}>
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
									<Form.Button
										className="inline-block"
										content="Cancel"
										onClick={this.closeModal}
									/>
									<Form.Button
										className="inline-block"
										content="Submit"
									/>
								</Form.Group>
							</Form>
							{this.state.error && (
								<div className="ui negative message">
									{this.state.error}
								</div>
							)}
							{this.state.createdProject && !this.state.name && !this.state.description && (
								<div className="ui success message">
									{`Project ${this.state.createdProject.name} created`}
								</div>
							)}
						</Modal.Content>
					</Modal>
				</div>
			</React.Fragment>
		);
	}
}

ProjectsList.propTypes = {
	getProjectsList: PropTypes.func,
	projectsList: PropTypes.arrayOf(PropTypes.object),
	createdProject: PropTypes.shape({
		name: PropTypes.string,
		description: PropTypes.string,
	}),
	createProject: PropTypes.func,
};

const mapStateToProps = state => ({
	projectsList: state.projects.projectsList,
	error: state.projects.errors,
	createdProject: state.projects.createdProject,
});

const mapDispatchToProps = dispatch => ({
	getProjectsList: () => dispatch(getProjectsList()),
	createProject: (name, description) => dispatch(createProject(name, description)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
