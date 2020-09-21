import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginActions } from '../../store/actions/index';

import './header.scss';

class Header extends Component {
  logOut = (e) => {
    e.preventDefault();
    const { history, logoutUser } = this.props;
    logoutUser();
    history.push(`/login`);
  };

  render() {
    const { loggedIn } = this.props;
    return (
      <>
        <div className="logoNameContainer">
          <Link to="/home">
            <img alt="Not Found" src="./assets/dinnerpartylogo.png" />
          </Link>
          <h1>Dinner Party</h1>
        </div>
        <div>
          {loggedIn && (
            <button type="button" onClick={this.logOut}>
              <i className="fas fa-sign-out-alt"></i>
            </button>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(loginActions.logout()),
  };
};

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  logoutUser: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
