import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';


// TODO have modal from separate component?
import { Header, Loader, Image, Icon, Modal, Form, Button } from 'semantic-ui-react';

import ProjectPicture from '../images/project.png';
import Issue from '../components/Issue';
import EditProject from '../components/EditProject';

import { fetchProject, editProject } from '../actions/projects';
import { createIssue } from '../actions/issues';

class ProjectExtended extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpened: false,
			name: '',
			description: '',
			status: 'Planed',
			project: '',
			createdIssue: null,
			error: null,
			editModalOpened: false,
		};
	}

	componentWillMount() {
		const { match: { params: { id } } } = this.props;
		if (id) this.props.fetchProject(id);
		this.setState({ project: id });
	}


	componentWillReceiveProps = (newProps) => {
		if (newProps.error && newProps.error.length && newProps.error !== this.state.error) {
			this.setState({ error: newProps.error[0] });
		} else if (this.state.error && !newProps.error) {
			this.setState({ error: null });
		}

		if ((!this.props.createdIssue && newProps.createdIssue)
			|| (newProps.createdIssue && newProps.createdIssue.name
				&& this.props.createdIssue.name !== newProps.createdIssue.name)) {
			this.setState({
				createdIssue: newProps.createdIssue,
				description: '',
				name: '',
			});
			this.props.fetchProject(this.props.match.params.id);
		}
	}

	groupBy(items, key) {
		return	items.reduce(
			(result, item) => ({
				...result,
				[item[key]]: [
					...(result[item[key]] || []),
					item,
				],
			}),
			{},
		);
	}

	sortIssues(issues) {
		const sortedIssues = this.groupBy(issues, 'status');
		const order = ['Planed', 'In Progress', 'Verified', 'Done'];
		return order.map(key => (
			<div className="issues-column" key={key}>
				<h3 className="issues-column-header">{key}</h3>
				{ sortedIssues[key] && sortedIssues[key].length > 0 && sortedIssues[key].map(issue =>	(
					<Issue key={issue.name} issue={issue} />
				))}
			</div>));
	}

	openModal = () => {
		this.setState({ modalOpened: true });
	}

	closeModal = () => {
		this.setState({ modalOpened: false });
	}

	createIssue = (e) => {
		e.preventDefault();
		const {
			name, description, project, status,
		} = this.state;
		if (name && description) {
			this.props.createIssue(name, description, project, status);
		}
	}

	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value });
	}

	openEditModal = () => (this.setState({ editModalOpened: true }));
	closeEditModal = () => (this.setState({ editModalOpened: false }));


	render() {
		return (
			<div className="project-extended">
				<Loader active={!this.props.selectedProject} content="Fetching project" />
				{this.props.selectedProject && (
					<React.Fragment>
						<Header as="h2">
							<React.Fragment>
								<Image src={ProjectPicture} />
								<div>
									{this.props.createdProject
										? this.props.createdProject.name
										: this.props.selectedProject.name}
								</div>
								<div>
									{this.props.createdProject
										? this.props.createdProject.description
										: this.props.selectedProject.description}
								</div>
							</React.Fragment>
						</Header>

						<Button
							as="a"
							content="Edit project"
							labelPosition="left"
							icon="edit"
							onClick={this.openEditModal}
						/>

						<Button
							as="a"
							content="Create new issue"
							labelPosition="left"
							icon="plus"
							onClick={this.openModal}
						/>

						{this.state.editModalOpened && (
							<EditProject
								project={this.props.selectedProject}
								closeEditModal={this.closeEditModal}
								editProject={this.props.editProject}
								error={this.props.error}
								createdProject={this.props.createdProject}
							/>
						)}

						{this.props.selectedProject.issues.length > 0 && (
							<div className="issues">
								{this.sortIssues(this.props.selectedProject.issues)}
							</div>
						)}

					</React.Fragment>
				)}

				<Link href="/projects" to="/projects">Go back to Projects Page</Link>

				<Modal open={this.state.modalOpened}>
					<Modal.Header>
							Create new issue
						<Icon
							name="remove"
							style={{ float: 'right' }}
							onClick={this.closeModal}
						/>
					</Modal.Header>
					<Modal.Content>
						<Form onClick={this.createIssue}>
							<Form.Group >
								<Form.Input
									required
									label="Issue name"
									name="name"
									value={this.state.name}
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
						{this.state.createdIssue && !this.state.name && !this.state.description && (
							<div className="ui success message">
								{`Issue ${this.state.createdIssue.name} created`}
							</div>
						)}
					</Modal.Content>
				</Modal>

			</div>
		);
	}
}

ProjectExtended.propTypes = {
	fetchProject: PropTypes.func,
	editProject: PropTypes.func,
	createIssue: PropTypes.func,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}),
	selectedProject: PropTypes.shape({
		description: PropTypes.string,
		name: PropTypes.string,
		issues: PropTypes.array,
	}),
	createdProject: PropTypes.shape({
		name: PropTypes.string,
		description: PropTypes.string,
	}),
	createdIssue: PropTypes.shape({
		name: PropTypes.string,
		comments: PropTypes.array,
		created_at: PropTypes.string,
		description: PropTypes.string,
		id: PropTypes.number,
		project: PropTypes.number,
		status: PropTypes.string,
	}),
	error: PropTypes.array,
};

const mapStateToProps = state => ({
	selectedProject: state.projects.selectedProject,
	error: state.issues.errors,
	createdIssue: state.issues.createdIssue,
	createdProject: state.projects.createdProject,
});

const mapDispatchToProps = dispatch => ({
	fetchProject: id => dispatch(fetchProject(id)),
	createIssue: (name, description, project, status) => dispatch(
		createIssue(name, description, project, status)
	),
	editProject: (id, name, description) => dispatch(editProject(id, name, description)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectExtended));
