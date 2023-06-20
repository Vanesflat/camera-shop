import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../../const';
import { Camera } from '../../../types/camera';
import { Review } from '../../../types/review';
import { ThunkOptions } from '../../../types/store';
import { getAverageRate } from '../../../utils/review';

export const fetchCamerasAction = createAsyncThunk<Camera[], undefined, ThunkOptions>(
  'data/fetchCameras',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Camera[]>(APIRoute.Cameras);

      for (let i = 0; i < data.length; i++) {
        const reviews = await api.get<Review[]>(`${APIRoute.Cameras}/${data[i].id}${APIRoute.Reviews}`);

        data[i].rating = getAverageRate(reviews.data);
      }

      return data;
    } catch {
      throw new Error();
    }
  }
);
