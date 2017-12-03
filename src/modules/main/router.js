import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../home';
import Login from '../user/login';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' render={ props => <Home { ...props } /> } />
          <Route path='/user/login' render={ props => <Login { ...props } /> } />
        </Switch>
      </Router>
    );
  }
}
