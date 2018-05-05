import jwtDecode from 'jwt-decode';
import * as auth from '../actions/auth';

const initialState = (localStorage.getItem('access') && localStorage.getItem('refresh'))
	? {
		access: {
			token: localStorage.getItem('access'),
			...jwtDecode(localStorage.getItem('access')),
		},
		refresh: {
			token: localStorage.getItem('refresh'),
			...jwtDecode(localStorage.getItem('refresh')),
		},
	}
	: {
		access: {},
		refresh: {},
	};


export default (state = initialState, action) => {
	switch (action.type) {
	case auth.SUCCESS:
		return {
			...state,
			errors: {},
			newUser: action.payload.message[0],
		};
	case auth.LOGIN_SUCCESS:
		localStorage.setItem('access', action.payload.access);
		localStorage.setItem('refresh', action.payload.refresh);
		return {
			access: {
				token: action.payload.access,
				...jwtDecode(action.payload.access),
			},
			refresh: {
				token: action.payload.refresh,
				...jwtDecode(action.payload.refresh),
			},
			errors: {},
		};
	case auth.TOKEN_RECEIVED:
		return {
			...state,
			access: {
				token: action.payload.access,
				...jwtDecode(action.payload.access),
			},
		};
	case auth.LOGIN_FAILURE:
	case auth.TOKEN_FAILURE:
		return {
			access: undefined,
			refresh: undefined,
			errors: action.payload.response || { non_field_errors: action.payload.statusText },
		};
	case auth.FAILURE:
		return {
			access: undefined,
			refresh: undefined,
			errors: { error: action.payload.response.username[0] },
		};
	default:
		return state;
	}
};

export function accessToken(state) {
	if (state.auth.access) {
		return state.auth.access.token;
	} else {
    return state.access;
  }
}

export function refreshToken(state) {
  if (state.auth && state.auth.refresh) {
    return state.auth.refresh;
  } else {
    return localStorage.getItem('refresh');
  }
}

export function isAccessTokenExpired(state) {
	if (state.access && state.access.exp) {
		return (1000 * state.access.exp) - (new Date()).getTime() < 5000;
	}
	return true;
}

export function isRefreshTokenExpired(state) {
	if (state.refresh && state.refresh.exp) {
		return (1000 * state.refresh.exp) - (new Date()).getTime() < 5000;
	}
	return true;
}

export function isAuthenticated(state) {
	return !isRefreshTokenExpired(state);
}

export function errors(state) {
	return state.errors;
}

export function withAuth(headers = {}) {
	return state => ({
		...headers,
		Authorization: `Bearer ${accessToken(state)}`,
	});
}
