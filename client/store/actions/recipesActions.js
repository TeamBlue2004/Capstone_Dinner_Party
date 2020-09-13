import axios from 'axios';
import { TYPES } from '../types';

const setRecipes = (recipes) => {
  return {
    type: TYPES.FETCH_RECIPES,
    recipes,
  };
};

const setFavoriteRecipes = (favRecipes) => {
  console.log('favRecipes --- ', favRecipes);
  return {
    type: TYPES.FETCH_FAVORITE_RECIPES,
    favRecipes,
  };
};

const fetchRecipes = (query) => async (dispatch) => {
  const { data } = await axios.get(`/api/recipes/${query}`);
  return dispatch(setRecipes(data));
};

const fetchFavoriteRecipes = (userId) => async (dispatch) => {
  const { data } = await axios.get(`/api/recipes/favorite/${userId}`);
  console.log('favorite recipe data -- ', data);
  return dispatch(setFavoriteRecipes(data));
};

export const recipesActions = {
  fetchRecipes,
  setRecipes,
  fetchFavoriteRecipes,
  setFavoriteRecipes,
};
