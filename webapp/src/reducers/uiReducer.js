import { Map } from 'immutable';
import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGOUT,
    DISPLAY_NOTIFICATION_DRAWER,
    HIDE_NOTIFICATION_DRAWER,
} from "../actions/uiActionTypes";

export const initialState = Map({
    isUserLoggedIn: false,
    isNotificationDrawerVisible: false,
    user: Map({}),
});

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return state.merge({isUserLoggedIn: true, user: Map(action.user) });

        case LOGIN_SUCCESS:
            return state.merge({isUserLoggedIn: true, user: Map(action.payload.user) });

        case LOGIN_FAILURE:
            return state.set('isUserLoggedIn', false);

        case LOGOUT:
            return state.set('isUserLoggedIn', false).set('user', null);

        case SIGNUP:
            return state.merge({ isUserLoggedIn: true, user: Map({}) });

        case SIGNUP_SUCCESS:
            return state.set('isUserLoggedIn', true);

        case SIGNUP_FAILURE:
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
