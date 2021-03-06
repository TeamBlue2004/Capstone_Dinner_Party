import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { recipesActions, userActions } from '../../store/actions/index';
import RecipesSearch from '../recipesSearch/RecipeSearch';
import RecipesResults from '../recipesResults/RecipesResults';
import Recipe from '../recipe/Recipe';

import './recipes.scss';

class Recipes extends Component {
  render() {
    const { nav } = this.props;
    return (
      <>
        <div className="routesContainer">
          <div className="routes">
            <div className="recipes-container">
              <div className="recipes-search">
                <RecipesSearch {...this.props} />
              </div>
              <RecipesResults {...this.props} />
            </div>
          </div>
        </div>
        {nav.open && nav.recipeId !== '' && (
          <div className="infoContainer">
            <Recipe />
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipes,
    userId: state.user.id,
    favoriteRecipes: state,
    nav: state.user.nav,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadRecipes: (query) => {
      dispatch(recipesActions.fetchRecipes(query));
    },
    updateUserFavoriteRecipe: (userId, recipeId) => {
      dispatch(userActions.updateUserFavoriteRecipe(userId, recipeId));
    },
    loadFavoriteRecipes: (userId) => {
      dispatch(userActions.fetchUserFavoriteRecipes(userId));
    },
  };
};

Recipes.defaultProps = {
  recipes: [],
  recipe: {},
};

Recipes.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
  recipe: PropTypes.objectOf(PropTypes.object),
  nav: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    eventId: PropTypes.string.isRequired,
    recipeId: PropTypes.string.isRequired,
  }).isRequired,
  userId: PropTypes.string.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  loadRecipes: PropTypes.func.isRequired,
  loadFavoriteRecipes: PropTypes.func.isRequired,
  updateUserFavoriteRecipe: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
