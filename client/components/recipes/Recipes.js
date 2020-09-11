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
    return (
      <div className="recipes-container">
        <div className="recipes-search">
          <RecipesSearch {...this.props} />
        </div>

        {recipes.map((recipe) => {
          return (
            <div className="card">
              <img
                className="card-img-top"
                src={recipe.image}
                alt={recipe.name}
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.name}</h5>
                <a href="/recipe" className="btn btn-primary">
                  View Recipe
                </a>
              </div>
            </div>
          );
        })}
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
