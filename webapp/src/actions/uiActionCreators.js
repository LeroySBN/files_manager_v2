import {bindActionCreators} from 'redux';
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
// import { validateCredentials} from "../utils/utils";

// const apiEndpoint = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function login(email, password) {
    return {
        type: LOGIN,
        // payload: { email, password },
        user: { email, password, isLoggedIn: true }
    }
}

const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: { user }
});

const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: { error }
});

function signup(email, password) {
    return {
        type: SIGNUP,
        payload: { email, password }
    }
}

const signupSuccess = (user) => ({
    type: SIGNUP_SUCCESS,
    payload: { user }
});

const signupFailure = (error) => ({
    type: SIGNUP_FAILURE,
    payload: { error }
});

export function logout() {
    return {
        type: LOGOUT
    }
}

export function displayNotificationDrawer() {
    return {
        type: DISPLAY_NOTIFICATION_DRAWER
    }
}

export function hideNotificationDrawer() {
    return {
        type: HIDE_NOTIFICATION_DRAWER
    }
}

// const dispatch = useDispatch();
//
// export const logIn = useCallback(
//     ({ email, password }) => dispatch(login(email, password)),
//     [dispatch]
// )
//
// export const signUp = useCallback(
//     ({ email, password }) => dispatch(signup(email, password)),
//     [dispatch]
// )
//
// export const logOut = useCallback(
//     () => dispatch(logout()),
//     [dispatch]
// )
//
// export const displayNotificationDrawer = useCallback(
//     () => dispatch(showNotificationDrawer()),
//     [dispatch]
// )
//
// export const hideNotificationDrawer = useCallback(
//     () => dispatch(removeNotificationDrawer()),
//     [dispatch]
// )

export const useUIActionCreators = () => {
    const dispatch = useDispatch();

    return {
        boundLogin: bindActionCreators(login, dispatch),
        boundSignup: bindActionCreators(signup, dispatch),
        boundLogout: bindActionCreators(logout, dispatch),
        boundDisplayNotificationDrawer: bindActionCreators(displayNotificationDrawer, dispatch),
        boundHideNotificationDrawer: bindActionCreators(hideNotificationDrawer, dispatch),
    };
};

// async function loginRequest(email, password) {
//   return (dispatch) => {
//     dispatch(login(email, password));
//
//     const credentials = `${email}:${password}`;
//     const base64Credentials = Buffer.from(credentials, 'utf-8').toString('base64');
//
//     console.log(`user encoded credential: ${base64Credentials}`);
//
//     return fetch(`${apiEndpoint}connect`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Basic ${base64Credentials})`
//         }
//     })
//     .then((res) => res.json())
//     .then((data) => {
//     if (data.email) {
//       dispatch(loginSuccess());
//     } else {
//       dispatch(loginFailure());
//     }
//     })
//     .catch((err) =>
//     {
//       dispatch(loginFailure());
//       console.log(err);
//     });
//   };
// }
