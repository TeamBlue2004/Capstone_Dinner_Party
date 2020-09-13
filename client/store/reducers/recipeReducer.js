import { TYPES } from '../types';

export const recipesReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.FETCH_RECIPES:
      return action.recipes;
    case TYPES.FETCH_FAVORITE_RECIPES:
      return action.favRecipes;
    default:
      return state;
  }
};
