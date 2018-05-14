import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Icon } from 'semantic-ui-react';


// TODO refresh on success
// clear form 
// error/success messages  
export default class EditIssue extends Component {
	constructor(props) {
		super(props);
		const { issue: { name: issueName, description, status: issueStatus } } = this.props;
		this.state = {
			issueName,
			description,
			errorMsg: '',
			successMsg: '',
			issueStatus,
		};
	}

	componentWillReceiveProps = (newProps) => {
		console.log(newProps);
		if (newProps.createdIssue !== this.props.createdIssue) {
			this.setState({
				successMsg : 'Issue updated.',
				errorMsg: '',
				issueName: newProps.createdIssue.name,
				description: newProps.createdIssue.description,
				issueStatus: newProps.createdIssue.status,
			});
		}

		if (newProps.error && newProps.error.length) {
			this.setState({
				errorMsg: 'Something went wrong. Try again.',
				successMsg: '',
			})
		}
		
	}

	editIssue = () => {
		this.props.editIssue(
			this.state.issueName,
			this.state.description,
			this.state.issueStatus,
			this.props.issue.project,
			this.props.issue.id,
		);
	}

	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value });
	}

	closeModal = () => {
		this.setState({
			errorMsg: '',
			successMsg: '',
		})
		this.props.closeEditModal();
	}

	render() {
		const statusOptions = [
			{
				text: 'Planed',
				value: 'Planed',
			},
			{
				text: 'In Progress',
				value: 'In Progress',
			},
			{
				text: 'Verified',
				value: 'Verified',
			},
			{
				text: 'Done',
				value: 'Done',
			},
		];

		return (
			<Modal open>
				<Modal.Header>Edit Issue {this.state.issueName}
					<Icon
						name="remove"
						style={{ float: 'right'}}
						onClick={this.closeModal}
					/>
				</Modal.Header>
				<Modal.Content>
					<Form>
						<Form.Group >
							<Form.Input
								required
								label="Issue name"
								name="issueName"
								value={this.state.issueName}
								placeholder="Issue name"
								onChange={this.handleChange}
							/>
							<Form.TextArea
								required
								label="Issue description"
								name="description"
								value={this.state.description}
								placeholder="Issue description"
								onChange={this.handleChange}
							/>
							<Form.Dropdown
								placeholder="Change status"
								fluid
								selection
								options={statusOptions}
								name="issueStatus"
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
								onClick={this.editIssue}
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

EditIssue.propTypes = {
	// TODO
};