import {Map} from 'immutable';
import {UI_ACTIONS} from "../actions/uiActions";

export const initialState = Map({
    appName: "FileCore",
    isNotificationDrawerVisible: false,
    dashboardFocus: "Home"
});

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case UI_ACTIONS.DISPLAY_NOTIFICATION_DRAWER:
            return state.set('isNotificationDrawerVisible', true);

        case UI_ACTIONS.HIDE_NOTIFICATION_DRAWER:
            return state.set('isNotificationDrawerVisible', false);

        case UI_ACTIONS.DASHBOARD_SHOW_HOME:
            return state.set('dashboardFocus', "Home");

        case UI_ACTIONS.DASHBOARD_SHOW_FILES:
            return state.set('dashboardFocus', "My Files");

        case UI_ACTIONS.DASHBOARD_SHOW_PHOTOS:
            return state.set('dashboardFocus', "Photos");

        case UI_ACTIONS.DASHBOARD_SHOW_SHARED:
            return state.set('dashboardFocus', "Shared");

        default:
            return state;
    }
  };

export default uiReducer;
