import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { recipesActions } from '../../store/actions/index';

class RecipesSearch extends Component {
  state = {
    input: '',
    ingredients: [],
    vegan: false,
    vegetarian: false,
    dairyFree: false,
    glutenFree: false,
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
    this.setState({ ingredients: updatedQuery });
  };

  filters = (vegan, vegetarian, dairyFree, glutenFree) => {
    let filterQuery = '';
    if (vegan === true) filterQuery += '&vegan=true';
    if (vegetarian === true) filterQuery += '&vegetarian=true';
    if (dairyFree === true) filterQuery += '&dairyFree=true';
    if (glutenFree === true) filterQuery += '&glutenFree=true';
    return filterQuery;
  };

  searchRecipes = () => {
    const {
      ingredients,
      vegan,
      vegetarian,
      dairyFree,
      glutenFree,
    } = this.state;
    const { history, loadRecipes } = this.props;
    const jointIngredients = ingredients.join(',');
    const searchURL = `?ingredients=${jointIngredients}${this.filters(
      vegan,
      vegetarian,
      dairyFree,
      glutenFree
    )}`;
    history.push({
      pathname: '/recipes',
      search: searchURL,
    });
    loadRecipes(history.location.search);
  };

  checkboxChecker = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
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
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            name="vegan"
            value="vegan"
            onChange={this.checkboxChecker}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            Vegan
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            name="vegetarian"
            value="vegetarian"
            onChange={this.checkboxChecker}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            Vegetarian
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            name="glutenFree"
            value="glutenFree"
            onChange={this.checkboxChecker}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            Gluten Free
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            name="dairyFree"
            value="dairyFree"
            onChange={this.checkboxChecker}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            Dairy Free
          </label>
        </div>
        <div className="ingredients">
          <ul>{selectedIngredients}</ul>
        </div>
        <div className="search-recipes">
          <button
            type="submit"
            onClick={this.searchRecipes}
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
