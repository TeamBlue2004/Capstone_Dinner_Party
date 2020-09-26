import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './button.scss';

export default class AddRecipeToFavoriteButton extends Component {
  render() {
    const { onClick, favorite } = this.props;

    return (
      <button className="btn-favorite" type="button" onClick={onClick}>
        {favorite ? (
          <i className="fas fa-heart"></i>
        ) : (
          <i className="far fa-heart"></i>
        )}
      </button>
    );
  }
}

AddRecipeToFavoriteButton.defaultProps = {
  favorite: false,
};

AddRecipeToFavoriteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  favorite: PropTypes.bool,
};
