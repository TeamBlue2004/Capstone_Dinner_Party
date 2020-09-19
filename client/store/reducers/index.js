import { combineReducers } from 'redux';

// Import reducers
import { recipesReducer } from './recipeReducer';
import { eventsReducer } from './eventReducer';
import { loginReducer } from './loginReducer';

const reducer = combineReducers({
  recipes: recipesReducer,
  events: eventsReducer,
  login: loginReducer,
});

export default reducer;
