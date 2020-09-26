import { TYPES } from '../types';

const initialRecipesState = {
  recipes: [],
  favRecipes: [],
  nav: {
    open: false,
    recipeId: '',
  },
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
    case TYPES.FETCH_FAVORITE_RECIPES:
      return {
        ...state,
        favRecipes: action.favRecipes,
      };
    case TYPES.SET_RECIPE_NAV:
      return {
        ...state,
        nav: {
          open: action.nav.open,
          recipeId: action.nav.id,
        },
      };
    default:
      return state;
  }
};
