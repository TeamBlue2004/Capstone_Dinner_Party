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

  render() {
    const { recipe } = this.props;
    return (
      <div className="card-body">
        <div className="card-top">
          <img
            className="recipe card-img-top"
            src={recipe.image}
            alt={recipe.name}
          />
          <ul className="ingredients">
            {recipe &&
              recipe.Ingredients &&
              recipe.Ingredients[0] &&
              recipe.Ingredients[0].name
                .split(';')
                .map((ingredient) => <li key={ingredient}>{ingredient}</li>)}
          </ul>
        </div>
        <h5>Instructions</h5>
        <hr />
        <ol className="instructions">
          {recipe &&
            recipe.steps &&
            recipe.steps.split('.').map((step) => <li key={step}>{step}</li>)}
        </ol>
        <div className="buttons">
          <AddRecipeToFavoriteButton />
          <AddRecipeToEventButton />
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
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  recipe: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  loadRecipe: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
