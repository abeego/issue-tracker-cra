import * as issues from '../actions/issues';

const initialState = {
	selectedIssueID: '',
};

export default (state = initialState, action) => {
	console.log(action, ...state);

	switch (action.type) {
	case issues.SELECT_ISSUE:
		return {
			...state,
			selectedIssue: action.issue,
		};
	case issues.ISSUE_CREATE_SUCCESS:
		return {
			...state,
			createdIssue: action.payload,
		};
	case issues.ISSUE_CREATE_FAILURE:
		return {
			...state,
			errors: action.payload.response.name,
		};

	default:
		return state;
	}
};
