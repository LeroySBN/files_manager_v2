import uiReducer from '../reducers/uiReducer';
import {
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../actions/uiActionTypes';

describe('uiReducer tests', () => {
  it('should return the initial state when no action is passed', () => {
    const newState = uiReducer(undefined, {});
    expect(newState.toJS()).toEqual({
      isNotificationDrawerVisible: false,
      isUserLoggedIn: false,
      user: {},
    });
  });

  it('should return the initial state when SELECT_COURSE action is passed', () => {
    const initialState = uiReducer(undefined, {});
    const newState = uiReducer(initialState, { type: 'SELECT_COURSE' });
    expect(newState.toJS()).toEqual(initialState.toJS());
  });

  it('should correctly change isNotificationDrawerVisible property when DISPLAY_NOTIFICATION_DRAWER action is passed', () => {
    const initialState = uiReducer(undefined, {});
    const expectedState = initialState.set('isNotificationDrawerVisible', true);
    const newState = uiReducer(initialState, { type: DISPLAY_NOTIFICATION_DRAWER });
    expect(newState.toJS()).toEqual(expectedState.toJS());
  });

  // Add more tests for other actions (LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT) if needed
});
