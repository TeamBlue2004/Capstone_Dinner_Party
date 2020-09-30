import { TYPES } from '../types';

const initialEventsState = {
  events: [],
  pendingEvents: [],
  eventGuests: [],
  eventRecipes: [],
  nav: {
    open: false,
    eventId: '',
  },
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
    case TYPES.SET_EVENT_NAV:
      return {
        ...state,
        nav: {
          open: action.nav.open,
          eventId: action.nav.id,
        },
      };
    case TYPES.FETCH_EVENT_RECIPES:
      return {
        ...state,
        eventRecipes: action.eventRecipes,
      };
    default:
      return state;
  }
};
