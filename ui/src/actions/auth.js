import { USER_LOGGED_IN, USER_SIGNUP, USER_LOGOUT } from '../types';
import api from '../api';
import axios from 'axios';
import setAuthorizationHeader from '../uitls/setAuthorizationHeader';

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userSignup = user => ({
  type: USER_SIGNUP,
  user
});

export const userLogout = () => ({
  type: USER_LOGOUT
});

export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    localStorage.bookwormJWT = user.token;
    setAuthorizationHeader(localStorage.bookwormJWT);
    user.isAuthenticated = true;
    dispatch(userLoggedIn(user));
  });

export const signup = userForm => dispatch =>
  api.user.signup(userForm).then(user => {
    localStorage.bookwormJWT = user.token;
    setAuthorizationHeader(localStorage.bookwormJWT);
    user.isAuthenticated = true;
    dispatch(userSignup(user));
  });

export const logout = () => dispatch => {
  localStorage.removeItem('bookwormJWT');
  setAuthorizationHeader();
  dispatch(userLogout());
};

export const confirmToken = confirmationToken => dispatch =>
  api.user.confirm(confirmationToken).then(user => {
    localStorage.bookwormJWT = user.token;
    user.isAuthenticated = true;
    dispatch(userLoggedIn(user));
  });

export const forgetPassword = data => () => api.user.forgetPassword(data);
export const validateToken = token => () => api.user.validateToken(token);
export const resetPassword = data => () => api.user.resetPassword(data);
