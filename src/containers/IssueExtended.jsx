import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { selectIssue } from '../actions/issues';

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
			<div className="issue-extended">
				{name}  {status} {description} {comments} {createdAt}
			</div>
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
