import React, { PureComponent } from 'react'
import { Switch, Route } from 'react-router-dom';

import HomePage from './HomePage';
import EnditPage from './EnditPage';


class ResloveRoutes extends PureComponent {
  render() {
    return (
      <Switch>
        <Route path="/edit/:id" component={EnditPage}/>
        <Route path="/:page?" component={HomePage}/>
      </Switch>
    );
  }
}

export default ResloveRoutes;
