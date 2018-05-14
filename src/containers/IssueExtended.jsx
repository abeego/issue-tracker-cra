import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Item, Comment, Button, Segment, Form, Divider } from 'semantic-ui-react';

import { selectIssue, addComment, editIssue } from '../actions/issues';
import { fetchProject } from '../actions/projects';

import EditIssue from '../components/EditIssue';

import AvatarImage from '../images/avatar.png';
// TODO add user

class IssueExtended extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: this.props.selectedIssue.comments,
			newComment: '',
			editModalOpened: false,
			selectedIssue: this.props.selectedIssue,
		};
	}
	componentWillMount() {
		if (this.props.selectedIssue) this.props.selectIssue(this.props.selectedIssue);
	}

	componentWillReceiveProps = (newProps) => {
		if (this.props.addedComment !== newProps.addedComment) {
			this.setState({ newComment: '' });
			this.props.fetchProject(this.props.selectedIssue.project);
		}

		if (newProps.selectedProject && newProps.selectedProject.issues) {
			const refreshedIssue = newProps.selectedProject.issues
				.filter(issue => issue.id === this.props.selectedIssue.id)[0];
			this.setState({ comments: refreshedIssue.comments });
		}

		if (newProps.createdIssue !== this.props.createdIssue) {
			this.setState({ selectedIssue: newProps.createdIssue });
		}
	}

	handleChange = (e, { value }) => {
		this.setState({ newComment: value });
	}

	addComment = () => {
		this.props.addComment(
			this.state.newComment,
			this.props.selectedIssue.id,
		);
	}

	openEditModal = () => {
		this.setState({ editModalOpened: true });
	}

	closeEditModal = () => {
		this.setState({ editModalOpened: false });
	}

	render() {
		const {
			selectedIssue: {
				name,
				status,
				description,
				created_at: createdAt,
			},
		} = this.state;

		const { comments } = this.state;

		return (
			<Segment className="issue-extended">
				{this.state.editModalOpened && (
					<EditIssue 
						editIssue={this.props.editIssue}
						issue={this.props.selectedIssue}
						closeEditModal={this.closeEditModal}
						createdIssue={this.props.createdIssue}
						error={this.props.error}
					/>
				)}
				<Item.Group>
					<Item>
						<Item.Content>
							<Item.Header>{name}</Item.Header>
							<Item.Meta>Description:</Item.Meta>
							<Item.Description>{description}</Item.Description>
							<Item.Meta>Created:</Item.Meta>
							<Item.Description>{createdAt}</Item.Description>
							<Item.Meta>Status</Item.Meta>
							<Item.Description>{status}</Item.Description>
							<Item.Extra>
								<Button
									as="a"
									floated="right"
									content="Edit"
									labelPosition="left"
									icon="edit"
									onClick={this.openEditModal}
								/>
							</Item.Extra>
							{comments && comments.length > 0 && (
								<Item.Extra>
									<Comment.Group size="large">
										{comments.map(comment => (
											<Comment key={comment.created_at}>
												<Comment.Avatar size="tiny" src={AvatarImage} />
												<Comment.Content>
													<Comment.Metadata>
														<div>{comment.created_at}</div>
													</Comment.Metadata>
													<Comment.Text>{comment.body}</Comment.Text>
												</Comment.Content>
												<Divider />
											</Comment>
										))}
									</Comment.Group>
									<Form>
										<Form.TextArea
											onChange={this.handleChange}
											value={this.state.newComment}
										/>
										<Button
											as="a"
											content="Add Reply"
											labelPosition="left"
											icon="edit"
											onClick={this.addComment}
										/>
									</Form>
								</Item.Extra>

							)}
							{comments.length === 0 && (
								<Form>
									<Form.TextArea
										onChange={this.handleChange}
										value={this.state.newComment}
									/>
									<Button
										as="a"
										content="Add Reply"
										labelPosition="left"
										icon="edit"
										onClick={this.addComment}
									/>
								</Form>
							)}
						</Item.Content>
					</Item>
				</Item.Group>
			</Segment>
		);
	}
}

IssueExtended.propTypes = {
	selectedIssue: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		status: PropTypes.string,
		description: PropTypes.string,
		created_at: PropTypes.string,
		comments: PropTypes.array,
		project: PropTypes.number,
	}),
	fetchProject: PropTypes.func,
	selectIssue: PropTypes.func,
	addComment: PropTypes.func,
	addedComment: PropTypes.shape({
		body: PropTypes.string,
		created_at: PropTypes.string,
		id: PropTypes.number,
		issue: PropTypes.number,
	}),
	selectedProject: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		issues: PropTypes.array,
	}),
};

const mapStateToProps = (state, ownProps) => ({
	selectedIssue: ownProps.location.state,
	addedComment: state.issues.addedComment,
	selectedProject: state.projects.selectedProject,
	createdIssue: state.issues.createdIssue,
	error: state.issues.errors,
});
const mapDispatchToProps = dispatch => ({
	selectIssue: issue => dispatch(selectIssue(issue)),
	addComment: (body, issue) => dispatch(addComment(body, issue)),
	fetchProject: id => dispatch(fetchProject(id)),
	editIssue: (name, description, status, project, id) => dispatch(
		editIssue(name, description, status, project, id)
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(IssueExtended);
