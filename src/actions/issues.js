
import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers';

export const SELECT_ISSUE = '@@issues/SELECT_ISSUE';

export const selectIssue = issue => ({
	type: SELECT_ISSUE, 
	issue,
});