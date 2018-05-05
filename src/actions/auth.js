import { RSAA } from 'redux-api-middleware';

export const LOGIN_REQUEST = '@@auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@@auth/LOGIN_FAILURE';
export const TOKEN_REQUEST = '@@auth/TOKEN_REQUEST';
export const TOKEN_RECEIVED = '@@auth/TOKEN_RECEIVED';
export const TOKEN_FAILURE = '@@auth/TOKEN_FAILURE';
export const REQUEST = '@@auth/REQUEST';
export const SUCCESS = '@@auth/SUCCESS';
export const FAILURE = '@@auth/FAILURE';

export const login = (username, password) => ({
	[RSAA]: {
		endpoint: '/api/token/',
		method: 'POST',
		body: JSON.stringify({ username, password }),
		headers: {
			'Content-Type': 'application/json',
			mode: 'no-cors',
		},
		types: [
			LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
		],
	},
});

export const register = (username, email, password) => ({
	[RSAA]: {
		endpoint: '/api/registration/',
		method: 'POST',
		body: JSON.stringify({ username, email, password }),
		headers: { 'Content-Type': 'application/json' },
		types: [
			REQUEST, SUCCESS, FAILURE,
		],
	},
});

export const refreshAccessToken = (token) => {
	return {
		[RSAA]: {
			endpoint: '/api/token/refresh/',
			method: 'POST',
			body: JSON.stringify({ refresh: token }),
			headers: { 'Content-Type': 'application/json' },
			types: [
				TOKEN_REQUEST, TOKEN_RECEIVED, TOKEN_FAILURE,
			],
		},
	};
};
