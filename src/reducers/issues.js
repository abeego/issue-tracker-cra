import * as issues from '../actions/issues';

const initialState = {
	selectedIssueID: '',
};

export default (state = initialState, action) => {
	switch (action.type) {
	case issues.SELECT_ISSUE:
		return {
			...state,
			selectedIssue: action.issue,
		};
	case issues.ISSUE_CREATE_SUCCESS:
		return {
			...state,
			errors: undefined,
			createdIssue: action.payload,
		};
	case issues.ISSUE_CREATE_FAILURE:
		return {
			...state,
			errors: action.payload.response.name,
		};
	case issues.ISSUE_EDIT_SUCCESS:
		return {
			...state,
			errors: undefined,
			createdIssue: action.payload,
		};
	case issues.ISSUE_EDIT_FAILURE:
		return {
			...state,
			errors: action.payload.response.name,
		};
	case issues.ADD_COMMENT_SUCCESS: 
		return {
			...state,
			errors: undefined,
			addedComment: action.payload,
		};
	case issues.ADD_COMMENT_FAILURE:
		return {
			...state,
			errors: action.payload.response.name,
		};

	default:
		return state;
	}
};
