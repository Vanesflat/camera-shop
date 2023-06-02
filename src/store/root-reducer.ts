import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { cameraSlice } from './reducers/camera/camera';
import { camerasSlice } from './reducers/cameras/cameras';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: camerasSlice.reducer,
  [NameSpace.Camera]: cameraSlice.reducer,
});
