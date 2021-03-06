import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { recipesActions } from '../../store/actions/index';
import './recipesSearch.scss';

class RecipesSearch extends Component {
  state = {
    input: '',
    ingredients: [],
    imgSrc: 'data:,',
    vegan: false,
    vegetarian: false,
    dairyFree: false,
    glutenFree: false,
    error: '',
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

  addIngredient = (event) => {
    event.preventDefault();
    const { input, ingredients } = this.state;
    const updatedQuery = [...ingredients, input];
    if (input !== '') {
      return this.setState(
        {
          ingredients: updatedQuery,
          error: '',
        },
        () => this.searchRecipes()
      );
    }
    return this.setState({ error: 'Please enter an ingredient' });
  };

  deleteIngredient = (event) => {
    const { ingredients, imgSrc } = this.state;
    const removedIngredient = event.target.parentNode.id;
    const filteredIngredients = ingredients.filter(
      (ingredient) => ingredient !== removedIngredient
    );
    this.setState(
      {
        ingredients: filteredIngredients,
        imgSrc: filteredIngredients.length === 0 ? 'data:,' : imgSrc,
        error: '',
      },
      () => this.searchRecipes()
    );
    if (filteredIngredients.length === 0)
      document.querySelector('input[type="file"]').value = '';
  };

  checkboxHandler = (event) => {
    this.setState({ [event.target.name]: event.target.checked }, () =>
      this.searchRecipes()
    );
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
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const imgBase = reader.result.replace(/^data:image\/(.*);base64,/, '');
      await axios.post(`/api/camera/`, { imgBase }).then((response) =>
        this.setState(
          {
            ingredients: response.data,
            imgSrc: URL.createObjectURL(file),
          },
          () => this.searchRecipes()
        )
      );
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
    this.setState({ input: '' });
    loadRecipes(history.location.search);
  };

  render() {
    const {
      input,
      ingredients,
      imgSrc,
      vegan,
      vegetarian,
      glutenFree,
      dairyFree,
      error,
    } = this.state;

    const dietaryRestrictions = [
      { vegan },
      { vegetarian },
      { glutenFree },
      { dairyFree },
    ];
    return (
      <div className="md-form">
        <h2>Search Recipes</h2>
        <form onSubmit={this.addIngredient}>
          <div className="camera-input">
            <input
              id="file-input"
              className="file-input"
              type="file"
              name="camera"
              accept="image/*"
              onChange={this.cameraHandler}
              capture="environment"
            />
            <label className="form-check-label" htmlFor="file-input">
              <i className="fa fa-camera" aria-hidden="true"></i>
            </label>
          </div>
          <input
            className="form-control"
            type="text"
            placeholder="Enter Ingredient"
            aria-label="Search"
            value={input}
            onChange={this.searchHandler}
          />
          {error !== '' && <span>{error}...</span>}
        </form>
        <div className="filters-dropdown">
          <input name="filters" id="filters-checkbox" type="checkbox" />
          <label id="filters-checkbox-label" htmlFor="filters-checkbox">
            Filters
          </label>
          <div className="filters-list">
            <div className="sensitivities">
              <p className="filters-title">Sensitivites:</p>
              <div className="sensitivities-list">
                {dietaryRestrictions.map((restriction) => {
                  const keys = Object.entries(restriction);
                  const sensitivity = keys[0][0]
                    .split(/(?=[A-Z])/)
                    .reduce((acc, curr) => {
                      const uppCase =
                        curr.charAt(0).toUpperCase() + curr.slice(1);
                      return `${acc} ${uppCase}`.trim();
                    }, '');
                  return (
                    <div key={sensitivity} className="sensitivity">
                      <input
                        className="sensitivities-input"
                        type="checkbox"
                        name={keys[0][0]}
                        checked={keys[0][1]}
                        value={keys[0][1]}
                        onChange={this.checkboxHandler}
                      />
                      <label className="form-check-label" htmlFor={keys[0][0]}>
                        {sensitivity}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="ingredients">
          <ul className="list-group">
            {ingredients &&
              ingredients.map((ingredient) => {
                return (
                  <li
                    key={ingredient}
                    id={ingredient}
                    className="list-group-item"
                  >
                    <span>{ingredient}</span>
                    <button type="button" onClick={this.deleteIngredient}>
                      X
                    </button>
                  </li>
                );
              })}
          </ul>
          <div className="image-preview">
            <img src={imgSrc} alt="" />
          </div>
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
