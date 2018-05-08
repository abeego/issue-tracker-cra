import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Item, Comment, Button, Segment, Form } from 'semantic-ui-react';

import { selectIssue } from '../actions/issues';

import AvatarImage from '../images/avatar.png';
// TODO add user

class IssueExtended extends Component {
	componentWillMount() {
		if (this.props.selectedIssue) this.props.selectIssue(this.props.selectedIssue);
	}

	render() {
		const {
			selectedIssue: {
				name,
				status,
				description,
				comments,
				created_at: createdAt,
			},
		} = this.props;

		return (
			<Segment className="issue-extended">
				<Item.Group>
					<Item>
						{/* <Item.Image size="small" src={ProjectPicture} /> */}
						<Item.Content>
							<Item.Header>{name}</Item.Header>
							<Item.Meta>Description:</Item.Meta>
							<Item.Description>{description}</Item.Description>
							<Item.Meta>Created:</Item.Meta>
							<Item.Description>{createdAt}</Item.Description>
							<Item.Meta>Status</Item.Meta>
							<Item.Description>{status}</Item.Description>
							<Item.Extra>
								<Button as="a" floated="right" content="Edit" labelPosition="left" icon="edit" />
							</Item.Extra>
							{comments && comments.length > 0 && (
								<Item.Extra>
									{comments.map(comment => (
										<Comment>
											<Comment.Avatar size="tiny" src={AvatarImage} />
											<Comment.Content>
												{/* <Comment.Author as='a'>Matt</Comment.Author> */}
												<Comment.Metadata>
													<div>{comment.created_at}</div>
												</Comment.Metadata>
												<Comment.Text>{comment.body}</Comment.Text>
												{/* <Comment.Actions>
														<Comment.Action disabled>Reply</Comment.Action>
													</Comment.Actions> */}
											</Comment.Content>
										</Comment>
									))}
									<Form reply>
										<Form.TextArea />
										<Button as="a" content="Add Reply" labelPosition="left" icon="edit" />
									</Form>
								</Item.Extra>

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
	}),
};

const mapStateToProps = (state, ownProps) => ({
	selectedIssue: ownProps.location.state,
});

const mapDispatchToProps = dispatch => ({
	selectIssue: issue => dispatch(selectIssue(issue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IssueExtended);
