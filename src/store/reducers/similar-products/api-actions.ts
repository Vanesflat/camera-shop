import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../../const';
import { Camera } from '../../../types/camera';
import { ThunkOptions } from '../../../types/store';
import { pushNotification } from '../notifications/notifications';

export const fetchSimilarCamerasAction = createAsyncThunk<Camera[], number, ThunkOptions>(
  'data/fetchSimilarCameras',
  async (cameraId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Camera[]>(`${APIRoute.Cameras}/${cameraId}${APIRoute.Similar}`);

      return data;
    } catch(err) {
      dispatch(pushNotification({type: 'error', message: 'Ошибка загрузки похожих товаров'}));
      throw err;
    }
  }
);
