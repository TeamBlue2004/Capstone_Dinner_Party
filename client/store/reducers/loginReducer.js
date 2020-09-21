import { TYPES } from '../types';

const initialLoginState = {
  username: '',
  password: '',
  id: '',
  loggedIn: false,
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
    default:
      return state;
  }
};
