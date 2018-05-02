import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import { apiMiddleware } from 'redux-api-middleware';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

import 'semantic-ui-css/semantic.min.css';

import Login from './containers/Login';

import './app.css';

const store = createStore(rootReducer, applyMiddleware(apiMiddleware));

const App = () => (
  <Provider store={store} >
    <Router>
      <Route path='/' component={Login} />
    </Router>
  </Provider>
)

export default App;
