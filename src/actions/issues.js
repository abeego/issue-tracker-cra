
import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers';

export const SELECT_ISSUE = '@@issues/SELECT_ISSUE';

export const ISSUE_CREATE = '@@issues/ISSUE_CREATE';
export const ISSUE_CREATE_SUCCESS = '@@isssue/ISSUE_CREATE_SUCCESS';
export const ISSUE_CREATE_FAILURE = '@@issues/ISSUE_CREATE_FAILURE';


export const selectIssue = issue => ({
	type: SELECT_ISSUE, 
	issue,
});

export const createIssue = (name, description, project, status, token) => {
	console.log('in action data', name, description, token);
	return {
		[RSAA]: {
			endpoint: '/api/issues/',
			method: 'POST',
			body: JSON.stringify({ name, description, project, status }),
			headers: withAuth({ 'Content-Type': 'application/json' }),
			types: [
				ISSUE_CREATE, ISSUE_CREATE_SUCCESS, ISSUE_CREATE_FAILURE,
			],
		},
	};
};
