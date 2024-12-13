import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import 'node-fetch';
import {
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
} from "./uiActionTypes";

export const signup = (email, password) => ({
  type: SIGNUP,
  user: { email, password }
})

export const login = (email, password) => ({
  type: LOGIN,
  user: { email, password }
})

export const signupSuccess = () => ({ type: SIGNUP_SUCCESS })
export const signupFailure = () => ({ type: SIGNUP_FAILURE })
export const loginSuccess = () => ({ type: LOGIN_SUCCESS })
export const loginFailure = () => ({ type: LOGIN_FAILURE })
export const logout = ()=> ({ type: LOGOUT })
export const displayNotificationDrawer = () => ({ type: DISPLAY_NOTIFICATION_DRAWER })
export const hideNotificationDrawer = () => ({ type: HIDE_NOTIFICATION_DRAWER })

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
    // return fetch('http://localhost:5000/login-success.json')
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
