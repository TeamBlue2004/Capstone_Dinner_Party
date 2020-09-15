import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddEventButton extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <button type="button" onClick={onClick}>
        <i className="fas fa-plus"></i>
      </button>
    );
  }
}

AddEventButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
