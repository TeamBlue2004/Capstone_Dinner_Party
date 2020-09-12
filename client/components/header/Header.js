import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Navbar, Nav } from 'react-bootstrap';

class Header extends Component {
  logOut(e) {
    e.preventDefault();
    const { history } = this.props;
    localStorage.removeItem('usertoken');
    history.push(`/login`);
    this.render();
  }

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
              <Nav.Link href="#recipes">Recipes</Nav.Link>
              <a
                role="button"
                href=""
                onClick={this.logOut.bind(this)}
                className="nav-link"
              >
                Logout
              </a>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Header);
