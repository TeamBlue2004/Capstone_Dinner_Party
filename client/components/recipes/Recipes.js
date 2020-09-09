import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const { recipes } = require('../../store/actions/recipes/recipes');

class Recipes extends Component {
  componentDidMount() {
    const { loadRecipes } = this.props;
    loadRecipes();
  }

  render() {
    return <h1>Recipes</h1>;
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadRecipes: () => {
      dispatch(recipes.fetchRecipes());
    },
  };
};

Recipes.propTypes = {
  loadRecipes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
