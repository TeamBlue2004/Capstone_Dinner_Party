import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { login } from '../../UserFunctions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { username } = this.state;
    const { password } = this.state;
    const user = { username, password };

    login(user).then((res) => {
      const { history } = this.props;
      if (res) {
        history.push(`/home`);
      }
      this.render();
    });
  }

  render() {
    const { username } = this.state;
    const { password } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="username"
                  className="form-control"
                  name="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={this.onChange}
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
                  onChange={this.onChange}
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
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Login);
