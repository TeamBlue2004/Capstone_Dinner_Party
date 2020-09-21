import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navbar, Nav } from 'react-bootstrap';
import { loginActions } from '../../store/actions/index';

class Header extends Component {
  logOut = (e) => {
    e.preventDefault();
    const { history, logoutUser } = this.props;
    logoutUser();
    history.push(`/login`);
  };

  render() {
    return (
      <header>
        <div className="d-flex justify-content-between align-items-center py-2 pl-3">
          <h1>Dinner Party</h1>
        </div>
        <Navbar bg="light" expand="sm">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#events">Events</Nav.Link>
              <Nav.Link href="#friends">Friends</Nav.Link>
              <Nav.Link href="#recipes?ingredients=">Recipes</Nav.Link>
              <Nav.Link onClick={this.logOut} className="nav-link">
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

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
};

export default connect(null, mapDispatchToProps)(Header);
