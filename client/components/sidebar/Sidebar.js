import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import './sidebar.scss';

export default class Sidebar extends Component {
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
        </div>
      </div>
    );
  }
}
