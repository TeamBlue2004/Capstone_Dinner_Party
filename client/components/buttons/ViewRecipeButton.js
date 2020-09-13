import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './button.scss';

export default class ViewRecipeButton extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <button
        className="recipe-view btn btn-warning"
        type="button"
        onClick={onClick}
      >
        -
      </button>
    );
  }
}

ViewRecipeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
