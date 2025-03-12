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
import {getLatestNotification} from "../utils/utils";

const listCourses = [
    { id: 1, name: "ES6", credit: 60 },
    { id: 2, name: "Webpack", credit: 20 },
    { id: 3, name: "React", credit: 40 },
];

export const listNotifications = [
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    { id: 3, type: "urgent", html: getLatestNotification() },
];

export const initialState = Map({
    isUserLoggedIn: false,
    isNotificationDrawerVisible: false,
    user: Map({}),
    listCourses,
    listNotifications,
});

const uiReducer = (state = initialState, action) => {
    console.log('Reducer received action:', action.type);
    console.log('State before update:', state.toJS());

    switch (action.type) {
        case LOGIN:
            return state.merge({ isUserLoggedIn: true, user: Map(action.payload.user) });

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
