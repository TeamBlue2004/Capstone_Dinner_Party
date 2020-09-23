import axios from 'axios';
import { TYPES } from '../types';

const getEvents = (events) => {
  return {
    type: TYPES.FETCH_EVENTS,
    events,
  };
};

<<<<<<< Updated upstream
=======
const setEventNav = (nav) => {
  return {
    type: TYPES.SET_EVENT_NAV,
    nav,
  };
};

>>>>>>> Stashed changes
const fetchEvents = (userId) => async (dispatch) => {
  const { data } = await axios.get(`/api/events/userevents/${userId}`);
  return dispatch(getEvents(data));
};

const postEvent = (event) => async (dispatch) => {
  await axios.post('/api/events', event);
  const { data } = await axios.get(`/api/events/userevents/${event.hostId}`);
  return dispatch(getEvents(data));
<<<<<<< Updated upstream
=======
};

const deleteEvent = (id, userId) => async (dispatch) => {
  await axios.delete(`/api/events/${id}`);
  const { data } = await axios.get(`/api/events/userevents/${userId}`);
  return dispatch(getEvents(data));
>>>>>>> Stashed changes
};

export const eventsActions = {
  fetchEvents,
  getEvents,
  postEvent,
<<<<<<< Updated upstream
=======
  deleteEvent,
  setEventNav,
>>>>>>> Stashed changes
};
