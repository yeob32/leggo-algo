import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import PlayGround from './PlayGround';
import NotFound from './NotFound';
// import NormalLoginForm from './NormalLoginForm';

import * as serviceWorker from './serviceWorker';

import 'antd/dist/antd.css';

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/play" component={PlayGround} />
      {/* <Route path="/login" component={NormalLoginForm} /> */}
      <Route component={NotFound} />
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
