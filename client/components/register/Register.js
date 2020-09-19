import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { register } from '../../UserFunctions';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      profilePic: '',
      email: '',
      addressUnit: '',
      addressStreet: '',
      addressCity: '',
      addressZIP: '',
      addressState: '',
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
    const {
      firstName,
      lastName,
      profilePic,
      email,
      addressUnit,
      addressCity,
      addressState,
      addressStreet,
      addressZIP,
      username,
      password,
    } = this.state;
    const newUser = {
      firstName,
      lastName,
      profilePic,
      email,
      addressUnit,
      addressCity,
      addressState,
      addressStreet,
      addressZIP,
      username,
      password,
    };

    register(newUser).then(() => {
      const { history } = this.props;
      history.push(`/login`);
    });
  }

  render() {
    const {
      firstName,
      lastName,
      profilePic,
      email,
      addressUnit,
      addressCity,
      addressState,
      addressStreet,
      addressZIP,
      username,
      password,
    } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Register</h1>
              <div className="form-group">
                <label htmlFor="name">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="addressUnit">Address Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="addressUnit"
                  placeholder="Enter address number"
                  value={addressUnit}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="addressStreet">Address Street</label>
                <input
                  type="text"
                  className="form-control"
                  name="addressStreet"
                  placeholder="Enter address street"
                  value={addressStreet}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="addressCity">Address City</label>
                <input
                  type="text"
                  className="form-control"
                  name="addressCity"
                  placeholder="Enter address city"
                  value={addressCity}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="addressState">Address State</label>
                <input
                  type="text"
                  className="form-control"
                  name="addressState"
                  placeholder="Enter address state"
                  value={addressState}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="addressZIP">Address ZIP</label>
                <input
                  type="text"
                  className="form-control"
                  name="addressZIP"
                  placeholder="Enter address ZIP"
                  value={addressZIP}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
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
                  type="text"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="profilePic">Profile Pic URL</label>
                <input
                  type="text"
                  className="form-control"
                  name="profilePic"
                  placeholder="Profile Pic URL"
                  value={profilePic}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Register!
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Register);