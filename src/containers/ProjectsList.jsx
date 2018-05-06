import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader, Modal, Form } from 'semantic-ui-react';

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
		};
	}

	componentDidMount() {
		this.props.getProjectsList(this.props.token);
	}

	openModal = () => {
		console.log('clicked');
		
		this.setState({ modalOpened: true });
	}

	createProject = () => {
		const { name, description } = this.state;
		// TODO validation? 
		if (name && description) {
			this.props.createProject(name, description, this.props.token);
			// TODO ceck for success and than close 
			// otherwise throw error
			this.setState({ modalOpened: false });
		}
	}

	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value });
	}

	render() {
		const modalStyle = {
			modal : {
				marginTop: '100px !important',
				marginLeft: 'auto',
				marginRight: 'auto'
			}
		};

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
					<Modal open={this.state.modalOpened} style={modalStyle.modal}>
						<Modal.Header>Create new project</Modal.Header>
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
									<Form.Button content='Cancel' onClick={() => this.setState({ modalOpened: false})} />
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
});

const mapDispatchToProps = dispatch => ({
	getProjectsList: token => dispatch(getProjectsList(token)),
	createProject: (name, description, token) => dispatch(createProject(name, description, token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
