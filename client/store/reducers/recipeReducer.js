import { TYPES } from '../types';

export const recipesReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.FETCH_RECIPES:
      return action.recipes;
    default:
      return state;
  }
};
