import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PrivateRoute extends React.Component {
  render() {
    const { component: Component, loggedIn, ...rest } = this.props;

    const isAuth = !loggedIn;

    return (
      <Route
        {...rest}
        render={(props) =>
          isAuth ? (
            <Redirect exact path to="/login" />
          ) : (
            <Component {...props} />
          )
        }
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
  };
};

PrivateRoute.defaultProps = {
  loggedIn: false,
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  loggedIn: PropTypes.bool,
};

export default connect(mapStateToProps)(PrivateRoute);
