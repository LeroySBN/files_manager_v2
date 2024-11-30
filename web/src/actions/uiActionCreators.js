import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'node-fetch';
import {
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
} from "./uiActionTypes";

export const signup = (email, password) => {
  return {
    type: SIGNUP,
    user: { email, password }
  };
}

export const signupSuccess = () => {
  return {
    type: SIGNUP_SUCCESS,
  };
}

export const signupFailure = () => {
  return {
    type: SIGNUP_FAILURE,
  };
}

export const login = (email, password) => {
  return {
    type: LOGIN,
    user: { email, password }
  };
}

export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
  };
}

export const loginFailure = () => {
  return {
    type: LOGIN_FAILURE,
  };
}

export const logout = ()=> {
    return {
        type: LOGOUT,
    };
}

export const displayNotificationDrawer = () => {
  return {
    type: DISPLAY_NOTIFICATION_DRAWER,
  };
}

export const hideNotificationDrawer = () => {
  return {
    type: HIDE_NOTIFICATION_DRAWER,
  };
}

export const useUIActionCreators = () => {
  const dispatch = useDispatch();

  return {
    boundSignup: bindActionCreators(signup, dispatch),
    boundSignupSuccess: bindActionCreators(signupSuccess, dispatch),
    boundSignupFailure: bindActionCreators(signupFailure, dispatch),
    boundLogin: bindActionCreators(login, dispatch),
    boundLoginSuccess: bindActionCreators(loginSuccess, dispatch),
    boundLoginFailure: bindActionCreators(loginFailure, dispatch),
    boundLogout: bindActionCreators(logout, dispatch),
    boundDisplayNotificationDrawer: bindActionCreators(displayNotificationDrawer, dispatch),
    boundHideNotificationDrawer: bindActionCreators(hideNotificationDrawer, dispatch),
  };
};

export async function loginRequest(email, password) {
  return (dispatch) => {
    dispatch(login(email, password));
    return fetch('http://localhost:8564/login-success.json')
      .then((res) => res.json())
      .then((data) => {
        if (data.email) {
          dispatch(loginSuccess());
        } else {
          dispatch(loginFailure());
        }
      })
      .catch((err) => console.log(err));
  };
}
