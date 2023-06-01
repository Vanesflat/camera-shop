import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { camerasSlice } from './reducers/cameras/cameras';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: camerasSlice.reducer,
});
