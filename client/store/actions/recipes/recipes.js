const axios = require('axios');
const { TYPES } = require('../../types');

const setRecipes = (recipes) => {
  return {
    type: TYPES.FETCH_RECIPES,
    recipes,
  };
};

const fetchRecipes = () => async (dispatch) => {
  const { data } = await axios.get(`/api/recipes/`);
  return dispatch(setRecipes(data));
};

export const recipes = {
  fetchRecipes,
  setRecipes,
};
