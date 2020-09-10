const axios = require('axios');
const { TYPES } = require('../../types');

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
  fetchRecipes,
  setRecipes,
};
