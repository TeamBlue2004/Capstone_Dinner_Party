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
    const some = favoriteRecipes.some(
      (favRecipe) => favRecipe.id === recipe.id
    );
    return some;
  };

  handleNavDisplay = (recipe) => {
    const { setNav, nav } = this.props;
    if (recipe.id === nav.recipeId) {
      const navObj = {
        open: !nav.open,
        eventId: '',
        recipeId: '',
        friendId: '',
      };
      setNav(navObj);
    } else {
      const navObj = {
        open: true,
        eventId: '',
        recipeId: recipe.id,
        friendId: '',
      };
      setNav(navObj);
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
                onClick={() => this.handleNavDisplay(recipe)}
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
    setNav: (recipe) => {
      dispatch(userActions.setNav(recipe));
    },
  };
};

RecipesResults.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  setNav: PropTypes.func.isRequired,
  nav: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    eventId: PropTypes.string.isRequired,
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
