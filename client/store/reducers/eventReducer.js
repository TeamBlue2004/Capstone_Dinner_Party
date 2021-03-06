import { TYPES } from '../types';

const initialEventsState = {
  events: [],
  pendingEvents: [],
  eventGuests: [],
  eventRecipes: [],
  commonEvents: [],
};

export const eventsReducer = (state = initialEventsState, action) => {
  switch (action.type) {
    case TYPES.FETCH_EVENTS:
      return {
        ...state,
        events: action.events,
      };
    case TYPES.FETCH_PENDING_EVENTS:
      return {
        ...state,
        pendingEvents: action.pendingEvents,
      };
    case TYPES.FETCH_EVENT_GUESTS:
      return {
        ...state,
        eventGuests: action.eventGuests,
      };
    case TYPES.FETCH_EVENT_RECIPES:
      return {
        ...state,
        eventRecipes: action.eventRecipes,
      };
    case TYPES.UPDATE_EVENT_RECIPES:
      return {
        ...state,
        eventRecipes: state.eventRecipes.map((recipe) =>
          recipe.id === action.eventRecipe.id ? action.eventRecipe : recipe
        ),
      };
    case TYPES.DELETE_EVENT_RECIPE:
      return {
        ...state,
        eventRecipes: state.eventRecipes.filter(
          (recipe) => recipe.id !== action.eventRecipeId
        ),
      };
    case TYPES.SET_COMMON_EVENTS:
      return {
        ...state,
        commonEvents: action.events,
      };
    default:
      return state;
  }
};
