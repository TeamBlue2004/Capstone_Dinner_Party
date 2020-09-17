import axios from 'axios';
import { TYPES } from '../types';

const getEvents = (events) => {
  console.log('getEvents action type---', events);
  return {
    type: TYPES.FETCH_EVENTS,
    events,
  };
};

const fetchEvents = (userId) => async (dispatch) => {
  console.log('fetchEvents action is called with  -- ', userId);
  const { data } = await axios.get(`/api/events/userevents/${userId}`);
  console.log('data after axios db call -- ', data);
  return dispatch(getEvents(data));
};

export const eventsActions = {
  fetchEvents,
  getEvents,
};
