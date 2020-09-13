import { combineReducers } from 'redux';

// Import reducers
import { recipesReducer } from './recipeReducer';
import { eventsReducer } from './eventReducer';

const reducer = combineReducers({
  recipes: recipesReducer,
  events: eventsReducer,
});

export default reducer;
