import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ViewRecipeButton extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <button className="btn btn-warning" type="button" onClick={onClick}>
        View Recipe
      </button>
    );
  }
}

ViewRecipeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
