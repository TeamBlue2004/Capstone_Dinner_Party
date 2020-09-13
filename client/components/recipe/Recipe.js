import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
        <div className="recipes-results">
          {/* {recipes.map((recipe) => {
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
          })} */}
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
