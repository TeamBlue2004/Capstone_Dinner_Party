import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

export default class Header extends Component {
  render() {
    return (
      <>
        <Link to="/home">
          <img alt="Not Found" src="./assets/dinnerpartylogo.png" />
        </Link>
        <h1>Dinner Party</h1>
      </>
    );
  }
}
