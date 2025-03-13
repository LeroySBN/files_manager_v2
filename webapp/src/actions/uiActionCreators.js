import { useDispatch } from 'react-redux';
import 'node-fetch';
import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
} from "./uiActionTypes";

const uri=process.env.FILES_API_SERVICE_URI;

// Simple validation function
const validateCredentials = (email, password) => {
    // Basic email and password validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && password.length >= 6;
};

export const login = (email, password) => ({
    type: LOGIN,
    payload: { email, password }
});

export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: { user }
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: { error }
});

export const signup = (email, password) => ({
    type: SIGNUP,
    payload: { email, password }
});

export const signupSuccess = (user) => ({
    type: SIGNUP_SUCCESS,
    payload: { user }
});

export const signupFailure = (error) => ({
    type: SIGNUP_FAILURE,
    payload: { error }
});

export const logout = () => ({ type: LOGOUT });
export const displayNotificationDrawer = () => ({ type: DISPLAY_NOTIFICATION_DRAWER });
export const hideNotificationDrawer = () => ({ type: HIDE_NOTIFICATION_DRAWER });

export const useUIActionCreators = () => {
    const dispatch = useDispatch();

    return {
        login: (email, password) => {
            // Dispatch initial login action
            dispatch(login(email, password));

            // Simulate login logic
            return new Promise((resolve, reject) => {
                // Simulate async operation
                setTimeout(() => {
                    if (validateCredentials(email, password)) {
                        // Successful login
                        const user = {
                            email,
                            lastLogin: new Date().toISOString()
                        };

                        dispatch(loginSuccess(user));
                        resolve(user);
                    } else {
                        // Failed login
                        const error = 'Invalid email or password';
                        dispatch(loginFailure(error));
                        reject(error);
                    }
                }, 500); // Simulate network delay
            });
        },
        signup: (email, password) => {
            // Dispatch initial signup action
            dispatch(signup(email, password));

            // Simulate signup logic
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (validateCredentials(email, password)) {
                        const user = {
                            email,
                            registeredAt: new Date().toISOString()
                        };

                        dispatch(signupSuccess(user));
                        resolve(user);
                    } else {
                        const error = 'Invalid email or password';
                        dispatch(signupFailure(error));
                        reject(error);
                    }
                }, 500);
            });
        },
        logout,
        displayNotificationDrawer,
        hideNotificationDrawer
    };
};

// export async function loginRequest(email, password) {
//   return (dispatch) => {
//     dispatch(login(email, password));
//     return fetch('http://localhost:5000/users/me')
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.email) {
//           dispatch(loginSuccess());
//         } else {
//           dispatch(loginFailure());
//         }
//       })
//       .catch((err) =>
//       {
//           dispatch(loginFailure());
//           console.log(err);
//       });
//   };
// }
