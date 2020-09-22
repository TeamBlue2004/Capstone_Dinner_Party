import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userActions } from '../../store/actions/index';
import './login.scss';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { loginUser, history } = this.props;
    const { username, password } = this.state;
    const user = { username, password };
    loginUser(user);
    history.push(`/home`);
  };

  render() {
    const { username, password } = this.state;
    const { error } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.handleSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="username"
                  className="form-control"
                  name="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
                href="/#/home"
              >
                Sign in
              </button>
              <a
                role="button"
                className="btn btn-lg btn-primary btn-block"
                href="/#/register"
              >
                Register
              </a>
            </form>
            {error && (
              <div className="alert alert-warning" role="alert">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    logggedIn: state.user.loggedIn,
    error: state.user.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => {
      dispatch(userActions.login(user));
    },
  };
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  loginUser: PropTypes.func.isRequired,
  error: PropTypes.string,
};
Login.defaultProps = {
  error: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
