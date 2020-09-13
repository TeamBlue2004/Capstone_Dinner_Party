import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddRecipeToEventButton extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <button className="btn btn-info" type="button" onClick={onClick}>
        Add To Event
      </button>
    );
  }
}

AddRecipeToEventButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
