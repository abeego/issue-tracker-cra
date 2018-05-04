import { RSAA } from 'redux-api-middleware';

export const PROJECTS_REQUEST = '@@projects/GET_PROJECT_LIST_REQUEST';
export const PROJECTS_REQUEST_SUCCESS = '@@projects/PROJECTS_REQUEST_SUCCESS';
export const PROJECTS_REQUEST_FAILURE = '@@projects/PROJECTS_REQUEST_FAILURE';

export const getProjectsList = token => ({
  [RSAA]: {
    endpoint: '/api/projects/',
    method: 'GET',
    headers: {
      'Content-Type': 'aplication/json',
      'Authorization': `Bearer ${token})}`,
    },
    types: [
      PROJECTS_REQUEST, PROJECTS_REQUEST_SUCCESS, PROJECTS_REQUEST_FAILURE,
    ],
  },
});

export const fetchProject = (id, token) => ({
  [RSAA]: {
    endpoint: `./api/project/${id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'aplication/json',
      'Authorization': `Bearer ${token}`
    }
  }
})