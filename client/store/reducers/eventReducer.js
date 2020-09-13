import { TYPES } from '../types';

export const eventsReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.FETCH_EVENTS:
      return action.events;
    default:
      return state;
  }
};
