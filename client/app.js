import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginActions } from './store/actions/index';
import {
  Header,
  Events,
  Home,
  Recipes,
  Friends,
  Login,
  Register,
  PrivateRoute,
} from './components/index';

import '../public/styles.scss';

class App extends Component {
  componentDidMount() {
    const { loginUser } = this.props;
    loginUser();
  }

  componentDidUpdate() {
    const { loginUser } = this.props;
    loginUser();
  }

  render() {
    const { loggedIn } = this.props;
    return (
      <div>
        <HashRouter>
          <div className="py-2">
            <Switch>
              <div>
                <PrivateRoute path="/" component={Header} />
                <PrivateRoute exact path="/home" component={Home} />
                <PrivateRoute exact path="/events" component={Events} />
                <PrivateRoute exact path="/friends" component={Friends} />
                <PrivateRoute exact path="/recipes" component={Recipes} />
                {loggedIn ? null : (
                  <div>
                    <Route
                      exact
                      path="/login"
                      render={(props) => <Login {...props} />}
                    />
                    <Route
                      exact
                      path="/register"
                      render={(props) => <Register {...props} />}
                    />
                  </div>
                )}
              </div>
            </Switch>
          </div>
        </HashRouter>
      </div>
    );
  }
}

App.propTypes = {
  loginUser: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: () => dispatch(loginActions.logInWithSession()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
