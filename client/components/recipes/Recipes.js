import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { recipesActions } from '../../store/actions/index';
import RecipesSearch from '../recipesSearch/RecipeSearch';
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
    const { recipes } = this.props;
    return (
      <div className="recipes-container">
        <div className="recipes-search">
          <RecipesSearch {...this.props} />
        </div>
        <div className="recipes-results">
          {recipes.map((recipe) => {
            return (
              <Link
                to={`/recipe/${recipe.id}`}
                key={recipe.id}
                className="card"
              >
                <img
                  className="card-img-top"
                  src={recipe.image}
                  alt={recipe.name}
                />
                <div className="card-body">
                  <h4 className="card-title">{recipe.name}</h4>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipes,
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
