import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <header>
        <div className="border-bottom d-flex justify-content-between align-items-center py-2 pl-3">
          <h1>Dinner Party</h1>
        </div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav">
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/events">Events</Link>
                </li>
                <li>
                  <Link to="/friends">Friends</Link>
                </li>
                <li>
                  <Link to="/recipes">Recipes</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
