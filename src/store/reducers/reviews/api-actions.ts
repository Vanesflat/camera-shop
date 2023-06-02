import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../../const';
import { Review } from '../../../types/review';
import { ThunkOptions } from '../../../types/store';

export const fetchReviewsAction = createAsyncThunk<Review[], number, ThunkOptions>(
  'data/fetchReviews',
  async (cameraId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Review[]>(`${APIRoute.Cameras}/${cameraId}${APIRoute.Reviews}`);

      return data;
    } catch {
      throw new Error();
    }
  }
);
