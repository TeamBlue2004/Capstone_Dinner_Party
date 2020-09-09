import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { recipes } from '../../store/actions/recipes/recipes';
import { RecipesSearch } from '../index';

class Recipes extends Component {
  render() {
    return <RecipesSearch {...this.props} />;
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
