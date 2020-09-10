import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { recipesActions } from '../../store/actions/index';

class RecipesSearch extends Component {
  state = {
    input: '',
    ingredients: [],
  };

  componentDidMount() {
    const {
      history: {
        location: { search },
      },
      loadRecipes,
    } = this.props;
    loadRecipes(search);
  }

  inputHandler = (event) => {
    this.setState({ input: event.target.value });
  };

  addIngredient = () => {
    const { input, ingredients } = this.state;
    const updatedQuery = [...ingredients, input];
    this.setState({ ingredients: updatedQuery }, () =>
      console.log(ingredients)
    );
  };

  searchRecipes = () => {
    const { ingredients } = this.state;
    const { history, loadRecipes } = this.props;
    // history.push({
    //   pathname: '/recipes',
    //   search: `?ingredients=${input}`,
    // });
    // loadRecipes(history.location.search);
  };

  render() {
    const { input, ingredients } = this.state;
    const selectedIngredients = ingredients.map((ingredient) => (
      <li key={ingredient}>{ingredient}</li>
    ));
    return (
      <div className="md-form">
        <form onSubmit={this.addIngredient}>
          <input
            className="form-control"
            type="text"
            placeholder="Enter Ingredient"
            aria-label="Search"
            value={input}
            onChange={this.inputHandler}
          />
        </form>
        <div className="ingredients">
          <ul>{selectedIngredients}</ul>
        </div>
        <div className="search-recipes">
          <button
            type="submit"
            onSubmit={this.searchRecipes}
            value="Search Recipes"
          >
            Search Recipes
          </button>
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

RecipesSearch.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
  }).isRequired,
  loadRecipes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipesSearch);
