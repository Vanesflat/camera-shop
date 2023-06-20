import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { sortSlice } from './reducers/sort/sort';
import { cameraSlice } from './reducers/camera/camera';
import { camerasSlice } from './reducers/cameras/cameras';
import { promoSlice } from './reducers/promo/promo';
import { reviewsSlice } from './reducers/reviews/reviews';
import { similarCamerasSlice } from './reducers/similar-products/similar-products';
import { filterSlice } from './reducers/filter/filter';
import { notificationsSlice } from './reducers/notifications/notifications';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: camerasSlice.reducer,
  [NameSpace.Camera]: cameraSlice.reducer,
  [NameSpace.Promo]: promoSlice.reducer,
  [NameSpace.Reviews]: reviewsSlice.reducer,
  [NameSpace.SimilarCameras]: similarCamerasSlice.reducer,
  [NameSpace.Sort]: sortSlice.reducer,
  [NameSpace.Filter]: filterSlice.reducer,
  [NameSpace.Notification]: notificationsSlice.reducer
});
