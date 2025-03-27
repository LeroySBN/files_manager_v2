import {createAction} from '@reduxjs/toolkit';
import {authService} from '../services/api';
import {fetchFilesAction, clearFilesAction} from "./fileActions";

// Action Types
export const AUTH_ACTIONS = {
  LOGIN_REQUEST: 'auth/loginRequest',
  LOGIN_SUCCESS: 'auth/loginSuccess',
  LOGIN_FAILURE: 'auth/loginFailure',
  SIGNUP_REQUEST: 'auth/signupRequest',
  SIGNUP_SUCCESS: 'auth/signupSuccess',
  SIGNUP_FAILURE: 'auth/signupFailure',
  LOGOUT: 'auth/logout',
  SET_USER: 'auth/setUser',
  CLEAR_AUTH_MESSAGE: 'auth/clearMessage'
};

// Action Creators
const loginRequest = createAction(AUTH_ACTIONS.LOGIN_REQUEST);
const loginSuccess = createAction(AUTH_ACTIONS.LOGIN_SUCCESS, (email) => ({ payload: { email } }));
const loginFailure = createAction(AUTH_ACTIONS.LOGIN_FAILURE, (error) => ({ payload: error }));
const signupRequest = createAction(AUTH_ACTIONS.SIGNUP_REQUEST);
const signupSuccess = createAction(AUTH_ACTIONS.SIGNUP_SUCCESS, (data) => ({ payload: data }));
const signupFailure = createAction(AUTH_ACTIONS.SIGNUP_FAILURE, (error) => ({ payload: error }));
const logoutAction = createAction(AUTH_ACTIONS.LOGOUT);
const setUser = createAction(AUTH_ACTIONS.SET_USER, (user) => ({ payload: user }));
export const clearAuthMessage = createAction(AUTH_ACTIONS.CLEAR_AUTH_MESSAGE);

// Thunk Actions
export const login = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    await authService.login(email, password);
    dispatch(loginSuccess(email));
    dispatch(fetchFilesAction());
  } catch (error) {
    // const errorMessage = error.response?.data?.error || error.message || 'Login failed';
    dispatch(loginFailure(error));
    throw error;
  }
};

export const signup = (email, password) => async (dispatch) => {
  dispatch(signupRequest());
  try {
    await authService.signup(email, password);
    dispatch(signupSuccess({
      message: 'Account created successfully! Please sign in.',
      email
    }));
  } catch (error) {
    // const errorMessage = error.response?.data?.error || error.message || 'Signup failed';
    dispatch(signupFailure(error));
    throw error;
  }
};

export const logout = () => async (dispatch) => {
  try {
    await authService.logout();
    dispatch(clearFilesAction());
    dispatch(logoutAction());
  } catch (error) {
    console.log('Logout error:', error);
    console.error('Logout error:', error);
  }
};

export const checkAuth = () => async (dispatch) => {
  try {
    const user = await authService.getCurrentUser();
    dispatch(setUser(user));
  } catch (error) {
    // Silent failure for auth check
    dispatch(logoutAction());
  }
};
