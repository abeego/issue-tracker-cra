import { combineReducers } from 'redux';
import auth, * as fromAuth from './auth';
import projects from './projects';
import issues from './issues';

export default combineReducers({ auth, projects, issues });

export const isAuthenticated = state => fromAuth.isAuthenticated(state.auth);
export const accessToken = state => fromAuth.accessToken(state.auth);
export const isAccessTokenExpired = state => fromAuth.isAccessTokenExpired(state.auth);
export const refreshToken = state => fromAuth.refreshToken(state.auth);
export const isRefreshTokenExpired = state => fromAuth.isRefreshTokenExpired(state.auth);
export const authErrors = state => fromAuth.errors(state.auth);
export const withAuth = state => fromAuth.withAuth(state.auth);
