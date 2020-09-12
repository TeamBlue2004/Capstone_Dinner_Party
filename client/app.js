import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HashRouter, Switch, Route } from 'react-router-dom';
import {
  Header,
  Events,
  Home,
  Recipes,
  Login,
  Register,
} from './components/index';

import '../public/styles.scss';

export default class App extends Component {
  render() {
    Login.propTypes = {
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    };

    Register.propTypes = {
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    };

    Header.propTypes = {
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    };
    return (
      <div>
        {localStorage.usertoken ? (
          <HashRouter>
            <Header />
            <div className="py-2">
              <Switch>
                {/* default welcome page should be login and if logged in then redirect to home */}
                <Route
                  exact
                  path="/home"
                  render={(props) => <Home {...props} />}
                />
                <Route exact path="/events" render={() => <Events />} />
                <Route
                  exact
                  path="/recipes"
                  render={(props) => <Recipes {...props} />}
                />
                <Route exact path="/login" render={() => <Login />} />
                <Route exact path="/register" render={() => <Register />} />
              </Switch>
            </div>
          </HashRouter>
        ) : (
          <HashRouter>
            <Login />
            <div className="py-2">
              <Switch>
                {/* default welcome page should be login and if logged in then redirect to home */}
                <Route
                  exact
                  path="/home"
                  render={(props) => <Home {...props} />}
                />
                <Route exact path="/events" render={() => <Events />} />
                <Route
                  exact
                  path="/recipes"
                  render={(props) => <Recipes {...props} />}
                />
                <Route exact path="/login" render={() => <Login />} />
                <Route exact path="/register" render={() => <Register />} />
              </Switch>
            </div>
          </HashRouter>
        )}
      </div>
    );
  }
}
