import { TYPES } from '../types';

const initialLoginState = {
  username: '',
  password: '',
  id: '',
  loggedIn: false,
  friends: [],
  user: {},
};

export const loginReducer = (state = initialLoginState, action) => {
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
    default:
      return state;
  }
};
