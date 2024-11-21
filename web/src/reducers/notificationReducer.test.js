import { 
    FETCH_NOTIFICATIONS_SUCCESS,
    MARK_AS_READ,
    SET_TYPE_FILTER,
} from '../actions/notificationActionTypes';
import notificationReducer from './notificationReducer';

describe('notificationReducer', () => {
  it('should return the initial state', () => {
    const initialState = notificationReducer(undefined, {});
    expect(initialState).toEqual({
      filter: '',
      notifications: [],
    });
  });

  it('should handle FETCH_NOTIFICATIONS_SUCCESS', () => {
    const mockData = [
      {
        id: 1,
        type: 'default',
        value: 'New course available',
      },
      {
        id: 2,
        type: 'urgent',
        value: 'New resume available',
      },
    ];

    const action = {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: mockData,
    };

    const state = notificationReducer(undefined, action);
    expect(state.notifications).toEqual([
      { id: 1, isRead: false, type: 'default', value: 'New course available' },
      { id: 2, isRead: false, type: 'urgent', value: 'New resume available' },
    ]);
  });

  it('should handle MARK_AS_READ', () => {
    const initialState = {
      filter: 'DEFAULT',
      notifications: [
        { id: 1, isRead: false, type: 'default', value: 'New course available' },
        { id: 2, isRead: false, type: 'urgent', value: 'New resume available' },
      ],
    };

    const action = {
      type: MARK_AS_READ,
      index: 1,
    };

    const state = notificationReducer(initialState, action);
    expect(state.notifications[1].isRead).toEqual(true);
  });

  it('should handle SET_TYPE_FILTER', () => {
    const initialState = {
      filter: 'DEFAULT',
      notifications: [
        { id: 1, isRead: false, type: 'default', value: 'New course available' },
        { id: 2, isRead: false, type: 'urgent', value: 'New resume available' },
      ],
    };

    const action = {
      type: SET_TYPE_FILTER,
      filter: 'URGENT',
    };

    const state = notificationReducer(initialState, action);
    expect(state.filter).toEqual('URGENT');
  });
});
