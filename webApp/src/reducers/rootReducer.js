import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import uiReducer from "./uiReducer";
import fileReducer from "./fileReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  file: fileReducer,
});

export default rootReducer;
