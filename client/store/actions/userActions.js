import axios from 'axios';
import { TYPES } from '../types';

// LOGIN & REGISTER
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

const setPendingFriends = (pendingFriends) => {
  return {
    type: TYPES.FETCH_PENDING_FRIENDS,
    pendingFriends,
  };
};

const setApprovedFriends = (approvedFriends) => {
  return {
    type: TYPES.FETCH_APPROVED_FRIENDS,
    approvedFriends,
  };
};

const setRequestSentMsg = (requestSentMsg) => {
  return {
    type: TYPES.ADD_AS_FRIEND,
    requestSentMsg,
  };
};

const setApproveRequestMsg = (approveRequestMsg) => {
  return {
    type: TYPES.APPROVE_FRIEND_REQUEST,
    approveRequestMsg,
  };
};

const setDeclineRequestMsg = (declineRequestMsg) => {
  return {
    type: TYPES.DECLINE_FRIEND_REQUEST,
    declineRequestMsg,
  };
};

const setError = (error) => {
  return {
    type: TYPES.SET_USER_ERROR,
    error,
  };
};

// USER FRIENDS
const getFriends = (friends) => {
  return {
    type: TYPES.FETCH_FRIENDS,
    friends,
  };
};

// USER DETAILS
const getUser = (user) => {
  return {
    type: TYPES.FETCH_USER_DETAILS,
    user,
  };
};

const getFriendData = (friend) => ({
  type: TYPES.SET_FRIEND_DATA,
  friend,
});

const setUser = (user) => {
  return {
    type: TYPES.EDIT_USER_DETAILS,
    user,
  };
};

// USER FAVORITE RECIPES
const setFavoriteRecipes = (favRecipes) => {
  return {
    type: TYPES.FETCH_FAVORITE_RECIPES,
    favRecipes,
  };
};

const setNav = (nav) => {
  return {
    type: TYPES.SET_NAV,
    nav,
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
    const nav = { open: false, eventId: '', recipeId: '', friendId: '' };
    dispatch(setNav(nav));
  };
};

const login = (user, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/users/login', {
        username: user.username,
        password: user.password,
      });
      await dispatch(setLoggedIn());
      await dispatch(setUserData(data));
      await dispatch(setError(''));
      history.push('/home');
    } catch (e) {
      await dispatch(setError(e.response.data.message));
    }
  };
};

const logInWithSession = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/users/session');
    if (data) {
      await dispatch(setUserData(data));
      await dispatch(setLoggedIn(true));
    } else {
      await dispatch(setLoggedIn(false));
    }
  };
};

const fetchFriends = (userId) => async (dispatch) => {
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

// Fetch all users
const getUsers = (usersList) => {
  return {
    type: TYPES.FETCH_USERS,
    usersList,
  };
};

const fetchUsers = () => async (dispatch) => {
  const { data } = await axios.get('/api/users');
  return dispatch(getUsers(data));
};

const addAsFriend = (friendId, userId) => async (dispatch) => {
  const { data } = await axios.post('/api/users/addasfriend', {
    friendId,
    userId,
  });
  return dispatch(setRequestSentMsg(data.message));
};

const approveFriend = (friendId, userId) => {
  return async (dispatch) => {
    const { data } = await axios.post('/api/users/approveFriend', {
      friendId,
      userId,
    });
    const friends = await axios.get(`/api/users/approveduserfriends/${userId}`);
    const pendingFriends = await axios.get(
      `/api/users/pendinguserfriends/${userId}`
    );
    dispatch(setApproveRequestMsg(data.message));
    dispatch(setApprovedFriends(friends.data));
    dispatch(setPendingFriends(pendingFriends.data));
  };
};

const declineFriend = (friendId, userId) => {
  return async (dispatch) => {
    const { data } = await axios.post('/api/users/declineFriend', {
      friendId,
      userId,
    });
    const pendingFriends = await axios.get(
      `/api/users/pendinguserfriends/${userId}`
    );
    dispatch(setDeclineRequestMsg(data.message));
    dispatch(setPendingFriends(pendingFriends.data));
  };
};

const deleteFriend = (friendId, userId) => {
  return async (dispatch) => {
    await axios.post('/api/users/deleteFriend', {
      friendId,
      userId,
    });
    const friends = await axios.get(`/api/users/approveduserfriends/${userId}`);
    dispatch(setApprovedFriends(friends.data));
  };
};

const fetchPendingFriends = (userId) => async (dispatch) => {
  const { data } = await axios.get(`/api/users/pendinguserfriends/${userId}`);
  return dispatch(setPendingFriends(data));
};

const fetchApprovedFriends = (userId) => async (dispatch) => {
  const { data } = await axios.get(`/api/users/approveduserfriends/${userId}`);
  return dispatch(setApprovedFriends(data));
};

const updateUserFavoriteRecipe = (userId, recipeId) => async (dispatch) => {
  await axios.post(`/api/users/favorites/`, {
    userId,
    recipeId,
  });
  const { data } = await axios.get(`/api/users/favorites/${userId}`);
  return dispatch(setFavoriteRecipes(data));
};

const fetchUserFavoriteRecipes = (userId) => async (dispatch) => {
  const { data } = await axios.get(`/api/users/favorites/${userId}`);
  return dispatch(setFavoriteRecipes(data));
};

const fetchFriendDetails = (friendId) => async (dispatch) => {
  const { data } = await axios.get(`/api/users/friends/${friendId}`);
  return dispatch(getFriendData(data));
};

export const userActions = {
  setLoggedIn,
  login,
  register,
  setLoggedOut,
  setUserData,
  logInWithSession,
  logout,
  fetchPendingFriends,
  fetchApprovedFriends,
  getFriends,
  fetchUserDetails,
  getUser,
  updateUserDetails,
  setUser,
  fetchUsers,
  addAsFriend,
  setPendingFriends,
  setApprovedFriends,
  approveFriend,
  declineFriend,
  deleteFriend,
  setApproveRequestMsg,
  updateUserFavoriteRecipe,
  fetchUserFavoriteRecipes,
  fetchFriends,
  fetchFriendDetails,
  getFriendData,
  setNav,
};
