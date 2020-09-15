import { TYPES } from '../types';

const initialEventsState = {
  events: [],
};

export const eventsReducer = (state = initialEventsState, action) => {
  switch (action.type) {
    case TYPES.FETCH_EVENTS:
      return {
        ...state,
        events: action.events,
      };
    default:
      return state;
  }
};
