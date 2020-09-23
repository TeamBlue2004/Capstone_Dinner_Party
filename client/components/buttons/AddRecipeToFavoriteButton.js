import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddRecipeToFavoriteButton extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <button className="btn btn-warning" type="button" onClick={onClick}>
        Favorite
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
