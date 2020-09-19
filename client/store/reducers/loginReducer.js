import { TYPES } from '../types';

const initialState = {
  username: '',
  password: '',
  loggedIn: false,
  friends: [],
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.UPDATE_FORM:
      return {
        ...state,
        [action.name]: action.value,
      };
    case TYPES.SET_LOGGEDIN:
      return {
        ...state,
        username: '',
        password: '',
        loggedIn: true,
      };
    case TYPES.FETCH_FRIENDS:
      return {
        ...state,
        friends: action.friends,
      };
    default:
      return state;
  }
};
