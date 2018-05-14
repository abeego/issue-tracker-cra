import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Icon } from 'semantic-ui-react';

export default class EditProject extends Component {
	constructor(props) {
		super(props);
		const { project: { name: projectName, description } } = this.props;
		this.state = {
			projectName,
			description,
			errorMsg: '',
			successMsg: '',
		};
	}

	componentWillReceiveProps = (newProps) => {
		if (newProps.createdProject !== this.props.createdProject) {
			this.setState({
				successMsg: 'Project updated.',
				errorMsg: '',
				projectName: newProps.createdProject.name,
				description: newProps.createdProject.description,
			});
		}

		if (newProps.error && newProps.error.length) {
			this.setState({
				errorMsg: 'Something went wrong. Try again.',
				successMsg: '',
			});
		}
	}

	editProject = () => {
		this.props.editProject(
			this.props.project.id,
			this.state.projectName,
			this.state.description,
		);
	}

	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value });
	}

	closeModal = () => {
		this.props.closeEditModal();
	}

	render() {
		return (
			<Modal open>
				<Modal.Header>Edit project {this.state.projectName}
					<Icon
						name="remove"
						style={{ float: 'right' }}
						onClick={this.closeModal}
					/>
				</Modal.Header>
				<Modal.Content>
					<Form>
						<Form.Group >
							<Form.Input
								required
								label="Project name"
								name="projectName"
								value={this.state.projectName}
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
								onClick={this.editProject}
							/>
						</Form.Group>
					</Form>
					{this.state.errorMsg && (
						<div className="ui negative message">
							{this.state.errorMsg}
						</div>
					)}
					{this.state.successMsg && (
						<div className="ui success message">
							{this.state.successMsg}
						</div>
					)}
				</Modal.Content>
			</Modal>
		);
	}
}

EditProject.propTypes = {
	editProject: PropTypes.func,
	closeEditModal: PropTypes.func,
	project: PropTypes.shape({
		id: PropTypes.number,
		issues: PropTypes.array,
		name: PropTypes.string,
	}),
	createdProject: PropTypes.shape({
		created_at: PropTypes.string,
		description: PropTypes.string,
		id: PropTypes.number,
		name: PropTypes.string,
	}),
	error: PropTypes.string,
};
