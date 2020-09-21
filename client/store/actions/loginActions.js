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

const register = (newUser) => {
  console.log(newUser);
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

export const loginActions = {
  setLoggedIn,
  login,
  register,
  setLoggedOut,
  setUserData,
  logInWithSession,
  logout,
};
