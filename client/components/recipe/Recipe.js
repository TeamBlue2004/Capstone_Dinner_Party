import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddRecipeToFavoriteButton from '../buttons/AddRecipeToFavoriteButton';
import AddRecipeToEventButton from '../buttons/AddRecipeToEventButton';
import { recipesActions } from '../../store/actions/index';
import './recipe.scss';

class Recipe extends Component {
  componentDidMount() {
    const { data, loadRecipe } = this.props;
    loadRecipe(data);
  }

  addRecipeToFavorite = (event) => {
    console.log(event);
  };

  filterRecipeFavorites = (recipe) => {
    const { favoriteRecipes } = this.props;
    return favoriteRecipes.some((favRecipe) => favRecipe.id === recipe.id);
  };

  render() {
    const { recipeNav, recipes } = this.props;
    const recipe = recipes.find((rcp) => rcp.id === recipeNav.recipeId);
    return (
      <div className="card-body">
        <div className="recipe-image">
          <AddRecipeToFavoriteButton
            onClick={() => this.addRecipeToFavorite(recipe)}
            favorite={this.filterRecipeFavorites(recipe)}
          />
          <img src={recipe && recipe.image} alt={recipe && recipe.name} />
        </div>
        <div className="ingredients">
          <h5>Ingredients</h5>
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
            recipe.steps
              .split(';')
              .map((step) => <li key={recipe.id}>{step}</li>)}
        </ol>
        <div className="buttons">
          <AddRecipeToFavoriteButton onClick={this.addRecipeToFavorite} />
          <AddRecipeToEventButton />
        </div>
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
  };
};

Recipe.defaultProps = {
  recipe: {},
};

Recipe.propTypes = {
  recipeId: PropTypes.string.isRequired,
  recipe: PropTypes.instanceOf(Object),
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  recipeNav: PropTypes.objectOf(PropTypes.object).isRequired,
  loadRecipe: PropTypes.func.isRequired,
  favoriteRecipes: PropTypes.func.isRequired,
  updateUserFavoriteRecipe: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
