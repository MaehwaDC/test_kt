import React, { PureComponent } from 'react'
import { Switch, Route } from 'react-router-dom';

import HomePage from './HomePage';


export default class ResloveRoutes extends PureComponent {
  render() {
    return (
      <Switch>
        <Route path="/:page?" component={HomePage}/>
      </Switch>
    );
  }
}