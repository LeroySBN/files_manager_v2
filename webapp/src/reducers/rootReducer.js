import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import { Map } from 'immutable';

const rootReducer = (state = Map(), action) => {
  if (action.type === 'auth/logout') {
    state = Map();
  }
  return combineReducers({
    auth: authReducer,
  })(state, action);
};

export default rootReducer;
