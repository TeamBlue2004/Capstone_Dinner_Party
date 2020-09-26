import { TYPES } from '../types';

const initialEventsState = {
  events: [],
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
    case TYPES.SET_EVENT_NAV:
      return {
        ...state,
        nav: {
          open: action.nav.open,
          eventId: action.nav.id,
        },
      };
    default:
      return state;
  }
};
