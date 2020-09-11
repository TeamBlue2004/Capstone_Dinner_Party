import React, { Component } from 'react';

export default class AddEventForm extends Component {
  render() {
    return (
      <form className="add-event-form">
        <div className="form-group">
          <label htmlFor="name" className="label-full">
            Date
            <input
              type="text"
              className="form-control"
              name="date"
              placeholder="date"
              required
            />
          </label>
        </div>
      </form>
    );
  }
}
