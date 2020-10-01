import { TYPES } from '../types';

const initialLoginState = {
  username: '',
  password: '',
  id: '',
  loggedIn: false,
  user: {},
  error: '',
  usersList: [],
  pendingFriendsList: [],
  approvedFriendsList: [],
  requestSentMsg: '',
  approveRequestMsg: '',
  declineRequestMsg: '',
  favoriteFoods: '',
  dislikedFoods: '',
  friendNav: {
    open: false,
    friendId: '',
  },
};

export const userReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case TYPES.UPDATE_FORM:
      return {
        ...state,
        [action.name]: action.value,
      };
    case TYPES.SET_LOGGEDIN:
      return {
        ...state,
        loggedIn: true,
      };
    case TYPES.SET_LOGGEDOUT:
      return {
        ...state,
        loggedIn: false,
      };
    case TYPES.SET_USER_DATA:
      return {
        ...state,
        username: action.username.username,
        id: action.username.id,
      };
    case TYPES.FETCH_FRIENDS:
      return {
        ...state,
        friends: action.friends,
      };
    case TYPES.FETCH_USER_DETAILS:
      return {
        ...state,
        user: action.user,
      };
    case TYPES.EDIT_USER_DETAILS:
      return {
        ...state,
        user: action.user,
      };
    case TYPES.SET_USER_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case TYPES.FETCH_USERS:
      return {
        ...state,
        usersList: action.usersList,
      };
    case TYPES.FETCH_PENDING_FRIENDS:
      return {
        ...state,
        pendingFriendsList: action.pendingFriends,
      };
    case TYPES.FETCH_APPROVED_FRIENDS:
      return {
        ...state,
        approvedFriendsList: action.approvedFriends,
      };
    case TYPES.ADD_AS_FRIEND:
      return {
        ...state,
        requestSentMsg: action.requestSentMsg,
      };
    case TYPES.APPROVE_FRIEND_REQUEST:
      return {
        ...state,
        approveRequestMsg: action.approveRequestMsg,
      };
    case TYPES.DECLINE_FRIEND_REQUEST:
      return {
        ...state,
        declineRequestMsg: action.declineRequestMsg,
      };
    case TYPES.SET_FRIEND_DATA:
      return {
        ...state,
        friendData: action.friend,
      };
    case TYPES.SET_FRIEND_NAV:
      return {
        ...state,
        friendNav: {
          open: action.friendNav.open,
          friendId: action.friendNav.id,
        },
      };
    default:
      return state;
  }
};
