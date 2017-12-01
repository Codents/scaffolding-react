import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../home';
import Login from '../user/login';

const homePath = '/';
const loginPath = '/user/login';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path={homePath} render={props => <Home {...props} />} />
          <Route path={loginPath} render={props => <Login {...props} />} />
        </div>
      </Router>
    );
  }
}
