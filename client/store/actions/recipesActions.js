import axios from 'axios';
import { TYPES } from '../types';

// FETCH SINGLE RECIPE BY ID
const setRecipe = (recipe) => {
  return {
    type: TYPES.FETCH_RECIPE,
    recipe,
  };
};

const fetchRecipe = (id) => async (dispatch) => {
  const { data } = await axios.get(`/api/recipe/${id}`);
  return dispatch(setRecipe(data));
};

// FETCH RECIPES BY SEARCH QUERY
const setRecipes = (recipes) => {
  return {
    type: TYPES.FETCH_RECIPES,
    recipes,
  };
};

const fetchRecipes = (query) => async (dispatch) => {
  const { data } = await axios.get(`/api/recipes/${query}`);
  return dispatch(setRecipes(data));
};

export const recipesActions = {
  setRecipe,
  fetchRecipe,
  setRecipes,
  fetchRecipes,
};
