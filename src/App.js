import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import './app.css';


const Home = () => {
  return <div>Home</div>;
}

const App = () => (
  <Router>
    <Route path='/' component={Home} />
  </Router>
)

export default App;
