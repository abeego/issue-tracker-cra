import * as projects from '../actions/projects';

const initialState = {
  projectsList: [],
};

export default (state = initialState, action) => {
  // console.log(action);
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
    default:
      return state;
  }
};