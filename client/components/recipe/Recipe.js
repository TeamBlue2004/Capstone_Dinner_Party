import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddRecipeToFavoriteButton from '../buttons/AddRecipeToFavoriteButton';
import AddRecipeToEventButton from '../buttons/AddRecipeToEventButton';
import { recipesActions } from '../../store/actions/index';
import './recipe.scss';

class Recipe extends Component {
  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      loadRecipe,
    } = this.props;
    loadRecipe(id);
  }

  render() {
    return (
      <div className="recipe-container">
        <div className="recipe">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{recipe.name}</h4>
              <img
                className="card-img-top"
                src={recipe.image}
                alt={recipe.name}
              />
              <ul className="ingredients">
                <h5>Ingredients</h5>
                {recipe &&
                  recipe.Ingredients &&
                  recipe.Ingredients[0] &&
                  recipe.Ingredients[0].name
                    .split(';')
                    .map((ingredient) => (
                      <li key={ingredient}>{ingredient}</li>
                    ))}
              </ul>
              <ol className="instructions">
                <h5>Instructions</h5>
                {recipe &&
                  recipe.steps &&
                  recipe.steps
                    .split('.')
                    .map((step) => <li key={step}>{step}</li>)}
              </ol>
              <AddRecipeToFavoriteButton />
              <AddRecipeToEventButton />
            </div>
          </div>
          <Link
            to={`/recipe/${recipe.id}`}
            key={recipe.id}
            className="card"
          ></Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipe: state.recipes.recipe,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadRecipe: (id) => {
      dispatch(recipesActions.fetchRecipe(id));
    },
  };
};

Recipe.propTypes = {
  // recipe: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  loadRecipe: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
