import { TYPES } from '../types';

const initialRecipesState = {
  recipe: [],
  recipes: [],
};

export const recipesReducer = (state = initialRecipesState, action) => {
  switch (action.type) {
    case TYPES.FETCH_RECIPE:
      return {
        ...state,
        recipe: action.recipe,
      };
    case TYPES.FETCH_RECIPES:
      return {
        ...state,
        recipes: action.recipes,
      };
    default:
      return state;
  }
};
