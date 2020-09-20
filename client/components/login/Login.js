import React, { Component } from 'react';
// import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginActions } from '../../store/actions/index';
import store from '../../store/store';

class Login extends Component {
  constructor() {
    super();

    const { username, password, loggedIn } = store.getState().login;

    this.state = {
      username,
      password,
      loggedIn,
    };

    store.subscribe(() => {
      const { username, password, loggedIn } = store.getState().login;

      this.setState({
        username,
        password,
        loggedIn,
      });
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   const { history } = this.props;
  //   const { loggedIn } = this.state;

  //   if (loggedIn) {
  //     history.push('/home');
  //   }
  // }

  // componentDidUpdate() {
  //   const { history } = this.props;
  //   const { loggedIn } = this.state;

  //   if (loggedIn) {
  //     history.push('/home');
  //   }
  // }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    console.log('clicked', this.props);
    e.preventDefault();
    const { loginUser, history } = this.props;
    const { username, password } = this.state;
    const user = { username, password };
    loginUser(user);
    history.push(`/home`);
  };

  render() {
    const { username, password } = this.state;
    console.log(store.getState().login);
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
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => {
      dispatch(loginActions.login(user));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    username: state.username,
    password: state.password,
    logggedIn: state.loggedIn,
  };
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
