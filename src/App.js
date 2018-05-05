import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import apiMiddleware from './middleware';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import 'semantic-ui-css/semantic.min.css';
import './styles/app.css';

import rootReducer from './reducers';

import Home from './components/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import PrivateRoute from './containers/PrivateRoute';
import ProjectsList from './containers/ProjectsList';
import ProjectExtended from './containers/ProjectExtended';

const store = createStore(rootReducer, applyMiddleware(apiMiddleware));

const App = () => (
	<Provider store={store} >
		<Router>
			<Switch>
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/" component={Home} />
				<PrivateRoute exact path="/projects" component={ProjectsList} />
				<PrivateRoute path="/project/:id" component={ProjectExtended} />
			</Switch>
		</Router>
	</Provider>
);

export default App;
