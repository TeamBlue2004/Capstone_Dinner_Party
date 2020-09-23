import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { recipesActions } from '../../store/actions/index';
import RecipesSearch from '../recipesSearch/RecipeSearch';
import RecipesResults from '../recipesResults/RecipesResults';
import Recipe from '../recipe/Recipe';

import './recipes.scss';

class Recipes extends Component {
  componentDidMount() {
    const {
      history: {
        location: { search },
      },
      loadRecipes,
    } = this.props;
    loadRecipes(search);
  }

  render() {
    const { recipeNav } = this.props;
    return (
      <div className="routesContainer">
        <div className="routes">
          <div className="recipes-container">
            <div className="recipes-search">
              <RecipesSearch {...this.props} />
            </div>
            <h4>{`Found ${recipes.length} result(s)...`}</h4>
            <div className="recipes-results">
              {recipes.map((recipe) => {
                return (
                  <div key={recipe.id} className="recipe">
                    <div className="recipe-body">
                      <img
                        className="recipe-img"
                        src={recipe.image}
                        alt={recipe.name}
                      />
                      <span className="recipe-title">{recipe.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {recipeNav.open && recipeNav.recipeId !== '' && (
          <div className="infoContainer">
            <Recipe />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipes,
    userId: state.user.id,
    favoriteRecipes: state,
    recipeNav: state.recipes.nav,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadRecipes: (query) => {
      dispatch(recipesActions.fetchRecipes(query));
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
  recipeNav: PropTypes.objectOf(PropTypes.object).isRequired,
  userId: PropTypes.string.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  loadRecipes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
