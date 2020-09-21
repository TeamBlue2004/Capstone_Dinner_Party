import axios from 'axios';
import { TYPES } from '../types';

const setLoggedIn = () => ({
  type: TYPES.SET_LOGGEDIN,
});

const setLoggedOut = () => ({
  type: TYPES.SET_LOGGEDOUT,
});

const setUserData = (username, id) => ({
  type: TYPES.SET_USER_DATA,
  username,
  id,
});

const getFriends = (friends) => {
  return {
    type: TYPES.FETCH_FRIENDS,
    friends,
  };
};

const getUser = (user) => {
  return {
    type: TYPES.FETCH_USER_DETAILS,
    user,
  };
};

const setUser = (user) => {
  return {
    type: TYPES.EDIT_USER_DETAILS,
    user,
  };
};

const register = (newUser) => {
  return axios.post('/api/users/register', {
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    addressUnit: newUser.addressUnit,
    addressStreet: newUser.addressStreet,
    addressCity: newUser.addressCity,
    addressState: newUser.addressState,
    addressZIP: newUser.addressZIP,
    profilePic: newUser.profilePic,
    username: newUser.username,
    password: newUser.password,
  });
};

const logout = () => {
  return async (dispatch) => {
    await axios.put('/api/users/logout');
    const user = {
      username: '',
      id: '',
    };
    dispatch(setLoggedOut());
    dispatch(setUserData(user));
  };
};

const login = (user) => async (dispatch) => {
  const { data } = await axios.post('/api/users/login', {
    username: user.username,
    password: user.password,
  });
  if (data) {
    return dispatch(setLoggedIn());
  }
  return 'Error logging in';
};

const logInWithSession = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/users/session');
    if (data) {
      dispatch(setUserData(data));
      dispatch(setLoggedIn(true));
    } else {
      dispatch(setLoggedIn(false));
    }
  };
};

const fetchFriends = (userId) => async (dispatch) => {
  console.log('user fiends action is called ---');
  const { data } = await axios.get(`/api/users/userfriends/${userId}`);
  return dispatch(getFriends(data));
};

const fetchUserDetails = (userId) => async (dispatch) => {
  const { data } = await axios.get(`/api/users/${userId}`);
  return dispatch(getUser(data));
};

const updateUserDetails = (user) => async (dispatch) => {
  await axios.put(`/api/users/updateuser/${user.id}`, {
    user,
  });
  const { data } = await axios.get(`/api/users/${user.id}`);
  return dispatch(setUser(data));
};

export const loginActions = {
  setLoggedIn,
  login,
  register,
  setLoggedOut,
  setUserData,
  logInWithSession,
  logout,
  fetchFriends,
  getFriends,
  fetchUserDetails,
  getUser,
  updateUserDetails,
  setUser,
};
