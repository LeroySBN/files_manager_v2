import {createAction} from '@reduxjs/toolkit';
import {fetchFilesAction, clearFilesAction} from "./fileActions";

// Action types
export const UI_ACTIONS = {
    DISPLAY_NOTIFICATION_DRAWER: 'ui/DISPLAY_NOTIFICATION_DRAWER',
    HIDE_NOTIFICATION_DRAWER: 'ui/HIDE_NOTIFICATION_DRAWER',
    DASHBOARD_SHOW_HOME: 'ui/DASHBOARD_SHOW_HOME',
    DASHBOARD_SHOW_FILES: 'ui/DASHBOARD_SHOW_FILES',
    DASHBOARD_SHOW_PHOTOS: 'ui/DASHBOARD_SHOW_PHOTOS',
    DASHBOARD_SHOW_SHARED: 'ui/DASHBOARD_SHOW_SHARED',
    DASHBOARD_SWITCH: 'ui/DASHBOARD_SWITCH',
};

// Action creators
const displayNotificationDrawer = createAction(UI_ACTIONS.DISPLAY_NOTIFICATION_DRAWER);
const hideNotificationDrawer = createAction(UI_ACTIONS.HIDE_NOTIFICATION_DRAWER);
const dashboardShowHome = createAction(UI_ACTIONS.DASHBOARD_SHOW_HOME);
const dashboardShowFiles = createAction(UI_ACTIONS.DASHBOARD_SHOW_FILES);
const dashboardShowPhotos = createAction(UI_ACTIONS.DASHBOARD_SHOW_PHOTOS);
const dashboardShowShared = createAction(UI_ACTIONS.DASHBOARD_SHOW_SHARED);
const dashboardSwitchAction = createAction(UI_ACTIONS.DASHBOARD_SWITCH, (focus) => ({ payload: focus }));

// Thunk actions
export const toggleNotificationDrawer = () => async (dispatch, getState) => {
    if (getState().ui.get('isNotificationDrawerVisible')) {
        dispatch(hideNotificationDrawer());
    } else {
        dispatch(displayNotificationDrawer());
    }
};

export const dashboardSwitch = (focus) => async (dispatch) => {
    dispatch(dashboardSwitchAction(focus));
    dispatch(clearFilesAction());
    dispatch(fetchFilesAction());
    if (focus === 'Home') {
        dispatch(dashboardShowHome());
    } else if (focus === 'My Files') {
        dispatch(dashboardShowFiles());
    } else if (focus === 'Photos') {
        dispatch(dashboardShowPhotos());
    } else if (focus === 'Shared') {
        dispatch(dashboardShowShared());
    }
};
