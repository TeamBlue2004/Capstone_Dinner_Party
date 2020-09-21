import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './sidebar.scss';

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebarContainer">
        <div className="sidebar">
          <div className="sidebarItem">
            <a href="#home">Home</a>
          </div>
          <div className="sidebarItem">
            <a href="#events">Events</a>
          </div>
          <div className="sidebarItem">
            <a href="#friends">Friends</a>
          </div>
          <div className="sidebarItem">
            <a href="#recipes?ingredients=">Recipes</a>
          </div>
          <div className="sidebarItem">
            <a href="useraccount">User Account</a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(Sidebar);
