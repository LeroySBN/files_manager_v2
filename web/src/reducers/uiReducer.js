import { Map } from 'immutable';
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
} from "../actions/uiActionTypes";

export const initialState = Map({
    isNotificationDrawerVisible: false,
    isUserLoggedIn: false,
    user: Map({}),
});

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP:
            return {}

        case SIGNUP_SUCCESS:
            return state.set('isUserLoggedIn', true);

        case SIGNUP_FAILURE:
            return state.set('isUserLoggedIn', false);

        case LOGIN:
            return {}

        case LOGIN_SUCCESS:
            return state.set('isUserLoggedIn', true);

        case LOGIN_FAILURE:
            return state.set('isUserLoggedIn', false);

        case LOGOUT:
            return state.set('isUserLoggedIn', false);

        case DISPLAY_NOTIFICATION_DRAWER:
            return state.set('isNotificationDrawerVisible', true);

        case HIDE_NOTIFICATION_DRAWER:
            return state.set('isNotificationDrawerVisible', false);

        default:
            return state;
    }
  };

export default uiReducer;
