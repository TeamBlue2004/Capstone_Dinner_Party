import { combineReducers } from 'redux';

// Import reducers
import { recipesReducer } from './recipeReducer';
import { eventsReducer } from './eventReducer';
import { userReducer } from './userReducer';

const reducer = combineReducers({
  recipes: recipesReducer,
  events: eventsReducer,
  login: userReducer,
});

export default reducer;
