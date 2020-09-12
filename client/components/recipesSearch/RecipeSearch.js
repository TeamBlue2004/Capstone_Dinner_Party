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
    this.loadParams();
    loadRecipes(search);
  }

  loadParams = () => {
    const {
      history: {
        location: { search },
      },
    } = this.props;
    const searchParams = new URLSearchParams(search);
    const ingredients =
      searchParams.get('ingredients') &&
      searchParams.get('ingredients').split(',');
    const vegan = searchParams.get('vegan');
    const vegetarian = searchParams.get('vegetarian');
    const dairyFree = searchParams.get('dairyFree');
    const glutenFree = searchParams.get('glutenFree');
    if (ingredients) {
      this.setState({ ingredients, vegan, vegetarian, dairyFree, glutenFree });
    }
  };

  inputHandler = (event) => {
    this.setState({ input: event.target.value });
  };

  addIngredient = () => {
    const { input, ingredients } = this.state;
    const updatedQuery = [...ingredients, input];
    this.setState({ ingredients: updatedQuery });
  };

  filters = (...args) => {
    let filterQuery = '';
    args.forEach((arg) => {
      const sensitivity = Object.entries(arg).flat();
      if (sensitivity[1]) filterQuery += `&${sensitivity[0]}=${sensitivity[1]}`;
    });
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
      { vegan },
      { vegetarian },
      { dairyFree },
      { glutenFree }
    )}`;
    history.push({
      pathname: '/recipes',
      search: searchURL,
    });
    loadRecipes(history.location.search);
  };

  checkboxHandler = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  deleteIngredient = (event) => {
    const { ingredients } = this.state;
    const removedIngredient = event.target.parentNode.id;
    const filteredIngredients = ingredients.filter(
      (ingredient) => ingredient !== removedIngredient
    );
    this.setState({ ingredients: filteredIngredients });
  };

  render() {
    const {
      input,
      ingredients,
      vegan,
      vegetarian,
      glutenFree,
      dairyFree,
    } = this.state;
    const selectedIngredients =
      ingredients &&
      ingredients.map((ingredient) => (
        <li
          key={ingredient}
          id={ingredient}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          {ingredient}
          <button
            type="button"
            onClick={this.deleteIngredient}
            className="badge badge-primary badge-pill"
          >
            X
          </button>
        </li>
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
            checked={vegan}
            onChange={this.checkboxHandler}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            Vegan
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            name="vegetarian"
            checked={vegetarian}
            onChange={this.checkboxChecker}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            Vegetarian
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            name="glutenFree"
            checked={glutenFree}
            onChange={this.checkboxChecker}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            Gluten Free
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            name="dairyFree"
            checked={dairyFree}
            onChange={this.checkboxChecker}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            Dairy Free
          </label>
        </div>
        <div className="ingredients">
          <ul className="list-group">{selectedIngredients}</ul>
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
