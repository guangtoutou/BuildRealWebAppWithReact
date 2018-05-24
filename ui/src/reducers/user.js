import { USER_LOGGED_IN, USER_SIGNUP, USER_LOGOUT } from '../types';

export default function user(state = {}, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.user;
    case USER_SIGNUP:
      return action.user;
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}
