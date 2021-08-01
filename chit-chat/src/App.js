import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';

import LoginPage from './pages/LoginPage/LoginPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' component={LoginPage} exact/>
          <Route path='/dashboard' component={DashboardPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
