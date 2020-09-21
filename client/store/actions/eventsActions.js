import axios from 'axios';
import { TYPES } from '../types';

const getEvents = (events) => {
  return {
    type: TYPES.FETCH_EVENTS,
    events,
  };
};

const fetchEvents = (userId) => async (dispatch) => {
  const { data } = await axios.get(`/api/events/userevents/${userId}`);
  return dispatch(getEvents(data));
};

export const eventsActions = {
  fetchEvents,
  getEvents,
};
