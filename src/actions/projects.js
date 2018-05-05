import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers';

export const PROJECTS_REQUEST = '@@projects/GET_PROJECT_LIST_REQUEST';
export const PROJECTS_REQUEST_SUCCESS = '@@projects/PROJECTS_REQUEST_SUCCESS';
export const PROJECTS_REQUEST_FAILURE = '@@projects/PROJECTS_REQUEST_FAILURE';

export const PROJECT_FETCH = '@@projects/PROJECT_FETCH';
export const PROJECT_FETCH_SUCCESS = '@@projects/PROJECT_FETCH_SUCCESS';
export const PROJECT_FETCH_FAILURE = '@@projects/PROJECT_FETCH_FAILURE';

export const getProjectsList = token => ({
	[RSAA]: {
		endpoint: '/api/projects/',
		method: 'GET',
		headers: withAuth({ 'Content-Type': 'application/json' }),
		types: [
			PROJECTS_REQUEST, PROJECTS_REQUEST_SUCCESS, PROJECTS_REQUEST_FAILURE,
		],
	},
});

export const fetchProject = (id, token) => ({
	[RSAA]: {
		endpoint: `/api/project/${id}`,
		method: 'GET',
		headers: withAuth({ 'Content-Type': 'application/json' }),
		types: [
			PROJECT_FETCH, PROJECT_FETCH_SUCCESS, PROJECT_FETCH_FAILURE,
		],
	},
});
