import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Icon } from 'semantic-ui-react';


// TODO refresh on success
// clear form 
// error/success messages  
export default class EditProject extends Component {
	constructor(props) {
		super(props);
		const { project: { name: projectName, description } } = this.props;
		this.state = {
			projectName,
			description,
			errorMsg: '',
			successMsg: '',
			// status,
		};
	}

	componentWillReceiveProps = (newProps) => {
		console.log(newProps.error);
		if (newProps.createdProject !== this.props.createdProject) {
			this.setState({
				successMsg : 'Project updated.',
				errorMsg: '',
				projectName: '',
				description: '',
			});
		}

		if (newProps.error && newProps.error.length) {
			this.setState({
				errorMsg: 'Something went wrong. Try again.',
				successMsg: '',
			})
		}
		
	}

	editProject = () => {
		console.log('edit project called');
		this.props.editProject(
			this.props.project.id,
			this.state.projectName,
			this.state.description,
			this.props.token
		);
	}

	handleChange = (e, { name, value }) => {
		console.log(name, value);
		this.setState({ [name]: value });
	}

	closeModal = () => {
		console.log('close the modal');
		this.props.closeEditModal();
	}

	render() {
		// const statusOptions = [
		// 	{
		// 		text: 'Planed',
		// 		value: 'Planed',
		// 	},
		// 	{
		// 		text: 'In Progress',
		// 		value: 'In Progress',
		// 	},
		// 	{
		// 		text: 'Verified',
		// 		value: 'Verified',
		// 	},
		// 	{
		// 		text: 'Done',
		// 		value: 'Done',
		// 	},
		// ];

		return (
			<Modal open>
				<Modal.Header>Edit project {this.state.projectName}
					<Icon
						name="remove"
						style={{ float: 'right'}}
						onClick={this.closeModal}
					/>
				</Modal.Header>
				<Modal.Content>
					<Form onClick={this.ditProject}>
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
							{/* <Form.Dropdown
								placeholder="Change status"
								fluid
								selection
								options={statusOptions}
								onChange={this.handleChange}
							/> */}
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
	// TODO
};