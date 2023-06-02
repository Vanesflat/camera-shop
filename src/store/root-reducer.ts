import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { cameraSlice } from './reducers/camera/camera';
import { camerasSlice } from './reducers/cameras/cameras';
import { promoSlice } from './reducers/promo/promo';
import { reviewsSlice } from './reducers/reviews/reviews';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: camerasSlice.reducer,
  [NameSpace.Camera]: cameraSlice.reducer,
  [NameSpace.Promo]: promoSlice.reducer,
  [NameSpace.Reviews]: reviewsSlice.reducer,
});
