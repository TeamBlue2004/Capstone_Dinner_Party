import { combineReducers } from 'redux';

// Import reducers
import { recipesReducer } from './recipeReducer';

const reducer = combineReducers({
  recipes: recipesReducer,
});

export default reducer;
