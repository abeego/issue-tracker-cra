import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
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

const Home = () => <div>Welcome back!</div>

const store = createStore(rootReducer, applyMiddleware(apiMiddleware));

const App = () => (
	<Provider store={store} >
		<Router>
			<Switch>
				<Route path="/register" component={Register} />
				<PrivateRoute exact path="/" component={ProjectsList} />
				<PrivateRoute exact path="/projects" component={ProjectsList} />
				<PrivateRoute path="/project/:id" component={ProjectExtended} />
			</Switch>
		</Router>
	</Provider>
);

export default App;
