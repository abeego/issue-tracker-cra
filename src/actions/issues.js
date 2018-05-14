
import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers';

export const SELECT_ISSUE = '@@issues/SELECT_ISSUE';

export const ISSUE_CREATE = '@@issues/ISSUE_CREATE';
export const ISSUE_CREATE_SUCCESS = '@@isssue/ISSUE_CREATE_SUCCESS';
export const ISSUE_CREATE_FAILURE = '@@issues/ISSUE_CREATE_FAILURE';

export const ISSUE_EDIT = '@@issues/ISSUE_EDIT';
export const ISSUE_EDIT_SUCCESS = '@@isssue/ISSUE_EDIT_SUCCESS';
export const ISSUE_EDIT_FAILURE = '@@issues/ISSUE_EDIT_FAILURE';

export const ADD_COMMENT = '@@issues/ADD_COMMENT';
export const ADD_COMMENT_SUCCESS = 	'@@issues/ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 	'@@issues/ADD_COMMENT_FAILURE';


export const selectIssue = issue => ({
	type: SELECT_ISSUE,
	issue,
});

export const createIssue = (name, description, project, status) => ({
	[RSAA]: {
		endpoint: '/api/issues/',
		method: 'POST',
		body: JSON.stringify({ name, description, project, status }),
		headers: withAuth({ 'Content-Type': 'application/json' }),
		types: [
			ISSUE_CREATE, ISSUE_CREATE_SUCCESS, ISSUE_CREATE_FAILURE,
		],
	},
});

export const editIssue = (name, description, status, project, id) => {
	console.log(name, description, status, id);
	return {
	[RSAA]: {
		endpoint: `/api/issues/${id}/`,
		method: 'PUT',
		body: JSON.stringify({ name, description, status, project }),
		headers: withAuth({ 'Content-Type': 'application/json' }),
		types: [
			ISSUE_EDIT, ISSUE_EDIT_SUCCESS, ISSUE_EDIT_FAILURE,
		],
	},
}
};


export const addComment = (body, issue) => ({
	[RSAA]: {
		endpoint: '/api/comments/',
		method: 'POST',
		body: JSON.stringify({ body, issue }),
		headers: withAuth({ 'Content-Type': 'application/json' }),
		types: [
			ADD_COMMENT, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
		],
	},
});
