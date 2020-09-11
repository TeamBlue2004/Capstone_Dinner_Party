import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { recipesActions } from '../../store/actions/index';
import RecipesSearch from '../recipesSearch/RecipeSearch';

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
    const { recipes } = this.props;
    const {
      history: {
        location: { search },
      },
    } = this.props;
    const listRecipes = recipes.map((recipe) => <li>{recipe.name}</li>);
    return (
      <div className="recipes-container">
        <div className="recipes-search">
          <RecipesSearch {...this.props} />
        </div>

        <div className="recipes-list">
          <h2>Recipes with {search}</h2>
          <ul>{listRecipes}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadRecipes: (query) => {
      dispatch(recipesActions.fetchRecipes(query));
    },
  };
};

Recipes.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  loadRecipes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
