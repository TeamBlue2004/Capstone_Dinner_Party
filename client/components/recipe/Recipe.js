import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddRecipeToFavoriteButton from '../buttons/AddRecipeToFavoriteButton';
import RecipeEvents from '../recipeEvents/RecipeEvents';
import { recipesActions, userActions } from '../../store/actions/index';
import './recipe.scss';

class Recipe extends Component {
  componentDidMount() {
    const { recipeId, loadRecipe } = this.props;
    loadRecipe(recipeId);
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

  render() {
    const { recipeNav, recipes } = this.props;
    const recipe = recipes.find((rcp) => rcp.id === recipeNav.recipeId);
    return (
      <div className="recipe-card">
        <h4>{recipe.name}</h4>
        <div className="recipe-image">
          <img src={recipe && recipe.image} alt={recipe && recipe.name} />
        </div>
        <div className="ingredients">
          <h5>Ingredients</h5>
          <AddRecipeToFavoriteButton
            onClick={() => this.addRecipeToFavorite(recipe)}
            favorite={this.filterRecipeFavorites(recipe)}
          />
          <hr />
          <ol>
            {recipe &&
              recipe.Ingredients &&
              recipe.Ingredients[0] &&
              recipe.Ingredients[0].name
                .split(';')
                .map((ingredient) => <li key={ingredient}>{ingredient}</li>)}
          </ol>
        </div>
        <h5>Instructions</h5>
        <hr />
        <ol className="instructions">
          {recipe &&
            recipe.steps &&
            recipe.steps.split(';').map((step) => <li key={step}>{step}</li>)}
        </ol>
        <RecipeEvents />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipe: state.recipes.recipe,
    recipeId: state.recipes.nav.recipeId,
    userId: state.user.id,
    favoriteRecipes: state.recipes.favRecipes,
    recipeNav: state.recipes.nav,
    recipes: state.recipes.recipes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadRecipe: (id) => {
      dispatch(recipesActions.fetchRecipe(id));
    },
    updateUserFavoriteRecipe: (userId, recipeId) => {
      dispatch(userActions.updateUserFavoriteRecipe(userId, recipeId));
    },
  };
};

Recipe.defaultProps = {
  recipeNav: {
    open: false,
    id: '',
  },
};

Recipe.propTypes = {
  recipeId: PropTypes.string.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  recipeNav: PropTypes.shape({
    open: PropTypes.bool,
    recipeId: PropTypes.string,
  }),
  loadRecipe: PropTypes.func.isRequired,
  favoriteRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateUserFavoriteRecipe: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
