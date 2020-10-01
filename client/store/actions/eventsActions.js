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

const getPendingEvents = (pendingEvents) => {
  return {
    type: TYPES.FETCH_PENDING_EVENTS,
    pendingEvents,
  };
};

const fetchPendingEvents = (userId) => async (dispatch) => {
  const { data } = await axios.get(`/api/events/userevents/pending/${userId}`);
  return dispatch(getPendingEvents(data));
};

const getEventsGuests = (eventGuests) => {
  return {
    type: TYPES.FETCH_EVENT_GUESTS,
    eventGuests,
  };
};

const fetchEventGuests = (eventId) => async (dispatch) => {
  const { data } = await axios.get(`/api/events/eventGuests/${eventId}`);
  return dispatch(getEventsGuests(data.Users));
};

const setEventNav = (nav) => {
  return {
    type: TYPES.SET_EVENT_NAV,
    nav,
  };
};

const getCommonEvents = (events) => ({
  type: TYPES.SET_COMMON_EVENTS,
  events,
});
const postEvent = (event) => async (dispatch) => {
  await axios.post('/api/events', event);
  const { data } = await axios.get(`/api/events/userevents/${event.hostId}`);
  return dispatch(getEvents(data));
};

const deleteEvent = (id, userId) => {
  return async (dispatch) => {
    await dispatch(setEventNav({ open: false, eventId: '' }));
    await axios.delete(`/api/events/${id}`);
    const { data } = await axios.get(`/api/events/userevents/${userId}`);
    dispatch(getEvents(data));
  };
};

const acceptEvent = (userId, eventId) => {
  return async (dispatch) => {
    await axios.put(`/api/events/accept`, { userId, eventId });
    const events = await axios.get(`/api/events/userevents/${userId}`);
    const pendingEvents = await axios.get(
      `/api/events/userevents/pending/${userId}`
    );
    dispatch(getEvents(events.data));
    dispatch(getEvents(pendingEvents.data));
  };
};

const declineEvent = (userId, eventId) => {
  return async (dispatch) => {
    await axios.put(`/api/events/decline`, { userId, eventId });
    const events = await axios.get(`/api/events/userevents/${userId}`);
    const pendingEvents = await axios.get(
      `/api/events/userevents/pending/${userId}`
    );
    dispatch(getEvents(events.data));
    dispatch(getEvents(pendingEvents.data));
  };
};

const setEventRecipes = (eventRecipes) => {
  return {
    type: TYPES.FETCH_EVENT_RECIPES,
    eventRecipes,
  };
};

const fetchEventRecipes = (eventId) => async (dispatch) => {
  const { data } = await axios.get(`/api/events/recipes/${eventId}`);
  return dispatch(setEventRecipes(data));
};

const addRecipeToEvent = (eventId, recipeId, userId, dish) => {
  return async () => {
    await axios.post(`/api/events/recipes`, {
      eventId,
      recipeId,
      userId,
      dish,
    });
  };
};

const fetchCommonEvents = (friendId, userId) => async (dispatch) => {
  //console.log('eventAction fetchCommonEvents is called ~~~ ');
  const { data } = await axios.get(
    `/api/events/commonevents/${friendId}/${userId}`
  );
  //console.log('commonevents ~~~ ', data);
  return dispatch(getCommonEvents(data));
};
export const eventsActions = {
  fetchEvents,
  fetchPendingEvents,
  fetchEventGuests,
  setEventNav,
  postEvent,
  deleteEvent,
  acceptEvent,
  declineEvent,
  addRecipeToEvent,
  fetchEventRecipes,
  fetchCommonEvents,
  getCommonEvents,
};
