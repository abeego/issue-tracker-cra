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
	default:
		return state;
	}
};
