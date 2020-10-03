import React, { Component } from 'react';
import { connect } from 'react-redux';

import './sidebar.scss';

class Sidebar extends Component {
  render() {
    return (
      <>
        <input name="sidebar" id="sidebar-checkbox" type="checkbox" />
        <label id="sidebar-checkbox-label" htmlFor="sidebar-checkbox"></label>
        <div className="sidebarContainer">
          <div className="sidebar">
            <div className="sidebarItem">
              <a href="#home">
                <i className="fa fa-home"></i> Home
              </a>
            </div>
            <div className="sidebarItem">
              <a href="#events">
                <span role="img" aria-label="calendar">
                  &#128197;
                </span>{' '}
                Events
              </a>
            </div>
            <div className="sidebarItem">
              <a href="#friends">
                <i className="fa fa-users" aria-hidden="true"></i> Friends
              </a>
            </div>
            <div className="sidebarItem">
              <a href="#recipes?ingredients=">
                <span role="img" aria-label="calendar">
                  🍽️
                </span>{' '}
                Recipes
              </a>
            </div>
            <div className="sidebarItem">
              <a href="#useraccount">
                <i className="fa fa-cogs" aria-hidden="true"></i> Profile
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(null, null)(Sidebar);
