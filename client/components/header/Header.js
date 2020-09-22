import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userActions } from '../../store/actions/index';

import './header.scss';

class Header extends Component {
  logOut = () => {
    const { logoutUser } = this.props;
    logoutUser();
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
            <Link to="/login" onClick={this.logOut}>
              <i className="fas fa-sign-out-alt"></i>
            </Link>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(userActions.logout()),
  };
};

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
