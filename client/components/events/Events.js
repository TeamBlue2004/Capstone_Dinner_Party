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
      <div className>
        <div className="p-2 d-flex flex-row justify-content-between align-items-center">
          <h2> My Events </h2>
          <button
            type="button"
            onClick={() => this.setState({ isPaneOpen: true })}
          >
            <i className="fas fa-plus"></i>
          </button>
          {isPaneOpen && <Event />}
        </div>
      </div>
    );
  }
}
