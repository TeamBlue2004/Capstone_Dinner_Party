import React, { Component } from 'react';
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
      <div className="routesContainer">
        <div className="routes">
          <div className="recipes-container">
            <div className="recipes-search">
              <RecipesSearch {...this.props} />
            </div>
            <h3>{`Found ${recipes.length} result(s)...`}</h3>
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
