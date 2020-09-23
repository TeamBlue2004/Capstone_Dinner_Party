import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { recipesActions, userActions } from '../../store/actions/index';
import AddRecipeToFavoriteButton from '../buttons/AddRecipeToFavoriteButton';

import './recipesResults.scss';

class RecipesResults extends Component {
  componentDidMount() {
    const {
      history: {
        location: { search },
      },
      userId,
      loadRecipes,
      loadFavoriteRecipes,
    } = this.props;
    loadFavoriteRecipes(userId);
    loadRecipes(search);
  }

  addRecipeToFavorite = async (recipe) => {
    const { userId, updateUserFavoriteRecipe } = this.props;
    await updateUserFavoriteRecipe(userId, recipe.id);
  };

  filterRecipeFavorites = (recipe) => {
    const { favoriteRecipes } = this.props;
    return favoriteRecipes.some((favRecipe) => favRecipe.id === recipe.id);
  };

  handleRecipeDisplay = (recipe) => {
    const { setRecipeNav, recipeNav } = this.props;
    if (recipe.id === recipeNav.recipeId) {
      const nav = { open: !recipeNav.open, id: '' };
      setRecipeNav(nav);
    } else {
      const nav = { open: true, id: recipe.id };
      setRecipeNav(nav);
    }
  };

  render() {
    const { recipes } = this.props;
    return (
      <div className="recipes-results">
        <h4>{`Found ${recipes.length} result(s)...`}</h4>
        {recipes.map((recipe, idx) => {
          return (
            <div
              key={recipe.id}
              className="recipe-result-container"
              onClick={() => this.handleRecipeDisplay(recipe)}
              onKeyPress={null}
              tabIndex={0}
              role="button"
            >
              <div
                key={recipe.id}
                id={recipe.id}
                className="recipe"
                role="button"
                tabIndex={idx}
                onClick={this.togglePane}
                onKeyPress={this.togglePane}
              >
                <div id={recipe.id} className="recipe-body">
                  <img
                    className="recipe-img"
                    id={recipe.id}
                    src={recipe.image}
                    alt={recipe.name}
                  />
                  <span id={recipe.id} className="recipe-title">
                    {recipe.name}
                  </span>
                </div>
              </div>
              <AddRecipeToFavoriteButton
                onClick={() => this.addRecipeToFavorite(recipe)}
                favorite={this.filterRecipeFavorites(recipe)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipes,
    userId: state.user.id,
    favoriteRecipes: state.recipes.favRecipes,
    recipeNav: state.recipes.nav,
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
    setRecipeNav: (recipe) => {
      dispatch(recipesActions.setRecipeNav(recipe));
    },
  };
};

RecipesResults.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  setRecipeNav: PropTypes.func.isRequired,
  recipeNav: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    recipeId: PropTypes.string.isRequired,
  }).isRequired,
  favoriteRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(RecipesResults);
