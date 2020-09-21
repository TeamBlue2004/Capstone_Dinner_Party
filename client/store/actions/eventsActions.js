import axios from 'axios';
import { TYPES } from '../types';

const getEvents = (events) => {
  return {
    type: TYPES.FETCH_EVENTS,
    events,
  };
};

const getFriends = (friends) => {
  return {
    type: TYPES.FETCH_FRIENDS,
    friends,
  };
};

const fetchEvents = (userId) => async (dispatch) => {
  const { data } = await axios.get(`/api/events/userevents/${userId}`);
  return dispatch(getEvents(data));
};

const fetchFriends = (userId) => async (dispatch) => {
  const { data } = await axios.get(`/api/events/userfriends/${userId}`);
  return dispatch(getFriends(data));
};

export const eventsActions = {
  fetchEvents,
  getEvents,
  fetchFriends,
  getFriends,
};
