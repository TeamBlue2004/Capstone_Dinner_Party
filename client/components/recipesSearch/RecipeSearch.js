import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
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
    const params = [
      { ingredients },
      { vegan },
      { vegetarian },
      { dairyFree },
      { glutenFree },
    ];
    params.forEach((param) => {
      const [state] = Object.entries(param);
      if (state[1] === 'true') state[1] = true; // convert 'true' into true
      if (state[1]) this.setState({ [state[0]]: state[1] });
    });
  };

  searchHandler = (event) => {
    this.setState({ input: event.target.value });
  };

  addIngredient = () => {
    const { input, ingredients } = this.state;
    const { fromCamera } = this.props;
    const updatedQuery = [...ingredients, input, ...fromCamera];
    this.setState({ ingredients: updatedQuery });
  };

  deleteIngredient = (event) => {
    const { ingredients } = this.state;
    const removedIngredient = event.target.parentNode.id;
    const filteredIngredients = ingredients.filter(
      (ingredient) => ingredient !== removedIngredient
    );
    this.setState({ ingredients: filteredIngredients });
  };

  checkboxHandler = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  sensitivities = (...args) => {
    let query = '';
    args.forEach((arg) => {
      const sensitivity = Object.entries(arg).flat();
      if (sensitivity[1]) query += `&${sensitivity[0]}=${sensitivity[1]}`;
    });
    return query;
  };

  cameraHandler = async (event) => {
    // const { loadIngredientsFromImage } = this.props;
    const file = event.target.files[0];
    const reader = new FileReader();
    await reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const result = reader.result.replace(/^data:image\/(.*);base64,/, '');
      await axios
        .post(`/api/camera/`, { result })
        .then((response) => this.setState({ ingredients: response.data }));
      // await loadIngredientsFromImage(
      //   reader.result.replace(/^data:image\/(.*);base64,/, '')
      // );
    };
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
    const jointIngredients = ingredients && ingredients.join(',');
    const searchURL = `?ingredients=${jointIngredients}${this.sensitivities(
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

  render() {
    const {
      input,
      ingredients,
      vegan,
      vegetarian,
      glutenFree,
      dairyFree,
    } = this.state;
    return (
      <div className="md-form">
        <form onSubmit={this.addIngredient}>
          <input
            className="form-control"
            type="text"
            placeholder="Enter Ingredient"
            aria-label="Search"
            value={input}
            onChange={this.searchHandler}
          />
        </form>
        <div className="form-check form-check">
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
            onChange={this.checkboxHandler}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            Vegetarian
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            name="glutenFree"
            checked={glutenFree}
            onChange={this.checkboxHandler}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            Gluten Free
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            name="dairyFree"
            checked={dairyFree}
            onChange={this.checkboxHandler}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            Dairy Free
          </label>
          <input
            className="form-check-input"
            type="file"
            name="camera"
            accept="image/*"
            onChange={this.cameraHandler}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            Dairy Free
          </label>
        </div>
        <div className="ingredients">
          <ul className="list-group">
            {ingredients &&
              ingredients.map((ingredient) => {
                return (
                  <li
                    key={ingredient}
                    id={ingredient}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>{ingredient}</span>
                    <button type="button" onClick={this.deleteIngredient}>
                      X
                    </button>
                  </li>
                );
              })}
          </ul>
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
    fromCamera: state.recipes.ingredientsFromCamera,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadRecipes: (query) => {
      dispatch(recipesActions.fetchRecipes(query));
    },
    loadIngredientsFromImage: (imgBase) => {
      dispatch(recipesActions.fetchIngredientsFromImage(imgBase));
    },
  };
};

// RecipesSearch.defaultProps = {
//   ingredientsFromCamera: [],
// };

RecipesSearch.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
  }).isRequired,
  // ingredientsFromCamera: PropTypes.arrayOf(PropTypes.string),
  loadRecipes: PropTypes.func.isRequired,
  // loadIngredientsFromImage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipesSearch);
