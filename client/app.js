import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from './store/actions/index';
import {
  Header,
  Sidebar,
  Home,
  Events,
  Recipes,
  Friends,
  Login,
  Register,
  PrivateRoute,
  UserAccount,
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
      <HashRouter>
        <div className="headerContainer">
          <Header />
        </div>
        <div className="mainContainer">
          {loggedIn ? (
            <>
              <Sidebar />
              <Switch>
                <PrivateRoute exact path="/home" component={Home} />
                <PrivateRoute exact path="/events" component={Events} />
                <PrivateRoute exact path="/friends" component={Friends} />
                <PrivateRoute exact path="/recipes" component={Recipes} />
                <PrivateRoute
                  exact
                  path="/useraccount"
                  component={UserAccount}
                />
              </Switch>
            </>
          ) : (
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  return <Redirect to="/login" />;
                }}
              />
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
            </Switch>
          )}
        </div>
      </HashRouter>
    );
  }
}

App.propTypes = {
  loginUser: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: () => dispatch(userActions.logInWithSession()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
