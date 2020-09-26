import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userActions } from '../../store/actions/index';
import RecipesSearch from '../recipesSearch/RecipeSearch';
import AddRecipeToFavoriteButton from '../buttons/AddRecipeToFavoriteButton';
import Recipe from '../recipe/Recipe';

import './favoriteRecipes.scss';

class FavoriteRecipes extends Component {
  state = {
    isPaneOpen: false,
  };

  componentDidMount() {
    const { userId, loadFavoriteRecipes } = this.props;
    loadFavoriteRecipes(userId);
  }

  addRecipeToFavorite = (recipe) => {
    const { userId, updateUserFavoriteRecipe } = this.props;
    updateUserFavoriteRecipe(userId, recipe.id);
  };

  togglePane = (event) => {
    const { isPaneOpen } = this.state;
    this.setState({ isPaneOpen: !isPaneOpen, recipeId: event.target.id });
  };

  render() {
    const { favoriteRecipes } = this.props;
    const { isPaneOpen, recipeId } = this.state;
    return (
      <>
        <div className="routesContainer">
          <div className="routes">
            <div className="recipes-container">
              <div className="recipes-search">
                <RecipesSearch {...this.props} />
              </div>
              <div className="recipes-results">
                {favoriteRecipes.map((recipe, idx) => {
                  return (
                    <div className="recipe-result-container">
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
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {isPaneOpen && (
          <div className="infoContainer">
            <Recipe recipeId={recipeId} />
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.id,
    favoriteRecipes: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserFavoriteRecipe: (userId, recipeId) => {
      dispatch(userActions.updateUserFavoriteRecipe(userId, recipeId));
    },
    loadFavoriteRecipes: (userId) => {
      dispatch(userActions.fetchUserFavoriteRecipes(userId));
    },
  };
};

FavoriteRecipes.propTypes = {
  favoriteRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  recipe: PropTypes.instanceOf(Object).isRequired,
  userId: PropTypes.string.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  loadFavoriteRecipes: PropTypes.func.isRequired,
  updateUserFavoriteRecipe: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRecipes);
