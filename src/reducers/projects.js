import * as projects from '../actions/projects';

const initialState = {
	projectsList: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
	case projects.PROJECTS_REQUEST_SUCCESS:
		return {
			...state,
			projectsList: action.payload,
		};
	case projects.PROJECTS_REQUEST_FAILURE:
		return {
			...state,
			errors: action.payload,
		};
	case projects.PROJECT_FETCH_SUCCESS:
		return {
			...state,
			selectedProject: action.payload,
		};
	case projects.PROJECT_FETCH_FAILURE:
		return {
			...state,
			errors: action.payload,
		};
	case projects.PROJECT_CREATE_SUCCESS:
		return {
			...state,
			errors: undefined,
			createdProject: action.payload,
		};
	case projects.PROJECT_CREATE_FAILURE:
		return {
			...state,
			errors: action.payload.response.name,
		};

	default:
		return state;
	}
};
