import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../../const';
import { Camera } from '../../../types/camera';
import { Review } from '../../../types/review';
import { ThunkOptions } from '../../../types/store';
import { getAverageRate } from '../../../utils/review';
import { pushNotification } from '../notifications/notifications';

export const fetchSimilarCamerasAction = createAsyncThunk<Camera[], number, ThunkOptions>(
  'data/fetchSimilarCameras',
  async (cameraId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Camera[]>(`${APIRoute.Cameras}/${cameraId}${APIRoute.Similar}`);

      for (let i = 0; i < data.length; i++) {
        const reviews = await api.get<Review[]>(`${APIRoute.Cameras}/${data[i].id}${APIRoute.Reviews}`);

        data[i].rating = getAverageRate(reviews.data);
      }

      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Ошибка загрузки похожих товаров' }));
      throw err;
    }
  }
);
