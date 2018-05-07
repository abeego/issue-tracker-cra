import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';


// TODO have modal from separate component?
// refresh after creation
// throw errors if there are some
// check ig it has been create before you close modal
import { Header, Loader, Image, Icon, Modal, Form } from 'semantic-ui-react';

import ProjectPicture from '../images/project.png';
import Issue from '../components/Issue';

import { fetchProject } from '../actions/projects';
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
		};
	}

	componentWillMount() {
		const { match: { params: { id } } } = this.props;
		if (id) this.props.fetchProject(id, this.props.token);
		this.setState({ project: id });
	}


	componentWillReceiveProps = (newProps) => {
		if (newProps.error && newProps.error.length && newProps.error !== this.state.error) {
			this.setState({ error: newProps.error[0] });
		} else if (this.state.error && !newProps.error) {
			this.setState({ error: null });
		}

		if ( (!this.props.createdIssue && newProps.createdIssue)
			|| (newProps.createdIssue && newProps.createdIssue.name 
				&& this.props.createdIssue.name !== newProps.createdIssue.name)) {
			this.setState({ 
				createdIssue: newProps.createdIssue,
				description: '',
				name: '',
			});
			this.props.fetchProject(this.props.match.params.id, this.props.token);
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

	createIssue = (e) => {
		e.preventDefault();
		const {
			name, description, project, status 
		} = this.state;
		if (name && description) {
			this.props.createIssue(name, description, project, status, this.props.token);
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
			<div className="project-extended">
				<a onClick={this.openModal}>CREATE NEW ISSUE</a>
				<Loader active={!this.props.selectedProject} content="Fetching project" />
				{this.props.selectedProject && (
					<React.Fragment>
						<Header as="h2">
							<React.Fragment>
								<Image src={ProjectPicture} />
								{this.props.selectedProject.name}
							</React.Fragment>
						</Header>
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
	token: PropTypes.string,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}),
	selectedProject: PropTypes.shape({
		name: PropTypes.string,
		issues: PropTypes.array,
	}),
};

const mapStateToProps = state => ({
	selectedProject: state.projects.selectedProject,
	token: (state.auth && state.auth.access && state.auth.access.token)
		? state.auth.access.token
		: null,
	error: state.issues.errors,
	createdIssue: state.issues.createdIssue,
}
);

const mapDispatchToProps = dispatch => ({
	fetchProject: (id, token) => dispatch(fetchProject(id, token)),
	createIssue: (name, description, project, status, token) => dispatch(createIssue(name, description, project, status, token)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectExtended));
