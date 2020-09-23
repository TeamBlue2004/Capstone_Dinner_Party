import React, { Component } from 'react';
import Event from '../event/Event';

export default class Events extends Component {
  constructor() {
    super();

    this.state = {
      isPaneOpen: false,
    };
  }

  render() {
    const { isPaneOpen } = this.state;
    return (
      <>
        <div className="routesContainer">
          <div className="routes">
            <h2> My Events </h2>
            <button
              type="button"
              onClick={() => this.setState({ isPaneOpen: true })}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
        {isPaneOpen && (
          <div className="infoContainer">
            <Event />
          </div>
        )}
      </>
    );
  }
}
