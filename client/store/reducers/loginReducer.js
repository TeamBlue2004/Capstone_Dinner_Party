import { TYPES } from '../types';

const initialState = {
  username: '',
  password: '',
  loggedIn: false,
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
    default:
      return state;
  }
};
