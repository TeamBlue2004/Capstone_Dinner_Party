import axios from 'axios';
import { TYPES } from '../types';

const getEvents = (events) => {
  return {
    type: TYPES.FETCH_EVENTS,
    events,
  };
};

const setEventNav = (nav) => {
  return {
    type: TYPES.SET_EVENT_NAV,
    nav,
  };
};

const fetchEvents = (userId) => async (dispatch) => {
  const { data } = await axios.get(`/api/events/userevents/${userId}`);
  return dispatch(getEvents(data));
};

const postEvent = (event) => async (dispatch) => {
  await axios.post('/api/events', event);
  const { data } = await axios.get(`/api/events/userevents/${event.hostId}`);
  return dispatch(getEvents(data));
};

const deleteEvent = (id, userId) => {
  return async (dispatch) => {
    await axios.delete(`/api/events/${id}`);
    const { data } = await axios.get(`/api/events/userevents/${userId}`);
    dispatch(getEvents(data));
    dispatch(setEventNav({ open: false, eventId: '' }));
  };
};

const addRecipeToEvent = (eventId, recipeId, userId, dishType) => {
  return async (dispatch) => {
    await axios.post(`/api/events/recipes`, {
      eventId,
      recipeId,
      userId,
      dishType,
    });
    // const { data } = await axios.get(`/api/events/userevents/${userId}`);
    // dispatch(getEvents(data));
    // dispatch(setEventNav({ open: false, eventId: '' }));
  };
};

export const eventsActions = {
  fetchEvents,
  getEvents,
  postEvent,
  deleteEvent,
  setEventNav,
  addRecipeToEvent,
};
