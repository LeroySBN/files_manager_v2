import {Map} from 'immutable';
import {UI_ACTIONS} from "../actions/uiActions";

export const initialState = Map({
    appName: "FileCore",
    isNotificationDrawerVisible: false,
    dashboardFocus: "Home",
    selectList: "home"
});

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case UI_ACTIONS.DISPLAY_NOTIFICATION_DRAWER:
            return state.set('isNotificationDrawerVisible', true);

        case UI_ACTIONS.HIDE_NOTIFICATION_DRAWER:
            return state.set('isNotificationDrawerVisible', false);

        case UI_ACTIONS.DASHBOARD_SHOW_HOME:
            return state.merge({
                'dashboardFocus': 'Home',
                'selectList': 'home'
            })

        case UI_ACTIONS.DASHBOARD_SHOW_FILES:
            return state.merge({
                'dashboardFocus': 'My Files',
                'selectList': 'files'
            })

        case UI_ACTIONS.DASHBOARD_SHOW_PHOTOS:
            return state.merge({
                'dashboardFocus': 'Photos',
                'selectList': 'images'
            })

        case UI_ACTIONS.DASHBOARD_SHOW_SHARED:
            return state.merge({
                'dashboardFocus': 'Shared',
                'selectList': 'shared'
            })

        default:
            return state;
    }
  };

export default uiReducer;
