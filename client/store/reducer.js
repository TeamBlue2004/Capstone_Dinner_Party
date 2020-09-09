import { combineReducers } from 'redux';

const { TYPES } = require('./types');

const recipesReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.FETCH_RECIPES:
      return action.recipes;
    default:
      return state;
  }
};

const reducer = combineReducers({
  recipes: recipesReducer,
});

export default reducer;
