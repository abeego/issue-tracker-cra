import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import React from 'react';
import { apiMiddleware } from 'redux-api-middleware';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import 'semantic-ui-css/semantic.min.css';
import './app.css';

import rootReducer from './reducers';

import Login from './containers/Login';
import Register from './containers/Register';
import PrivateRoute from './containers/PrivateRoute';
import ProjectsList from './containers/ProjectsList';
import ProjectExtended from './containers/ProjectExtended';

const store = createStore(rootReducer, applyMiddleware(apiMiddleware));

const App = () => (
	<Provider store={store} >
		<Router>
			<div>
				<Route path="/" component={Login} />
				<Route path="/register" component={Register} />
				<PrivateRoute path="/projects" component={ProjectsList} />
				<PrivateRoute path="/project/*" component={ProjectExtended} />
			</div>
		</Router>
	</Provider>
);

export default App;
