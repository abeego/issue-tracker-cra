import { RSAA, isRSAA, apiMiddleware } from 'redux-api-middleware';

import { TOKEN_RECEIVED, refreshAccessToken } from './actions/auth';
import { refreshToken, isAccessTokenExpired, isRefreshTokenExpired } from './reducers';
import { login } from './actions/auth';

export function createApiMiddleware() {
	let postponedRSAAs = [];

	return ({ dispatch, getState }) => {
		const rsaaMiddleware = apiMiddleware({ dispatch, getState });

		return next => (action) => {
			const nextCheckPostponed = (nextAction) => {
				// Run postponed actions after token refresh
				if (nextAction.type === TOKEN_RECEIVED) {
					next(nextAction);
					postponedRSAAs.forEach((postponed) => {
						rsaaMiddleware(next)(postponed);
					});
					postponedRSAAs = [];
				} else {
					console.log(nextAction);
					
					next(nextAction);
				}
			};

			if (isRSAA(action)) {
				const state = getState();
				const token = refreshToken(state);
				console.log(token, isAccessTokenExpired(state));
				console.log(isRefreshTokenExpired(state));
				
				if (isRefreshTokenExpired(state)) {
					const body = JSON.parse(action[RSAA].body);
					return rsaaMiddleware(nextCheckPostponed)(login(body.username, body.password));
				} else if (token && isAccessTokenExpired(state)) {
					postponedRSAAs.push(action);
					if (postponedRSAAs.length === 1) {
						return rsaaMiddleware(nextCheckPostponed)(refreshAccessToken(token));
					} 
					return;
				}

				return rsaaMiddleware(next)(action);
			}
			return next(action);
		};
	};
}

export default createApiMiddleware();
