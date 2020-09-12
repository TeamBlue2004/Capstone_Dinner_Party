import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Header, Home, Events, Friends, Recipes } from './components/index';

import '../public/styles.scss';

export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <Header />
        <div className="py-2">
          <Switch>
            {/* default welcome page should be login and if logged in then redirect to home */}
            <Route exact path="/home" render={(props) => <Home {...props} />} />
            <Route exact path="/events" render={() => <Events />} />
            <Route exact path="/friends" render={() => <Friends />} />
            <Route
              exact
              path="/recipes"
              render={(props) => <Recipes {...props} />}
            />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}
