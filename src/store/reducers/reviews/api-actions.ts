import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../../const';
import { Review } from '../../../types/review';
import { ReviewData } from '../../../types/review-data';
import { ThunkOptions } from '../../../types/store';
import { pushNotification } from '../notifications/notifications';

export const fetchReviewsAction = createAsyncThunk<Review[], number, ThunkOptions>(
  'data/fetchReviews',
  async (cameraId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Review[]>(`${APIRoute.Cameras}/${cameraId}${APIRoute.Reviews}`);

      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Ошибка загрузки отзывов' }));
      throw err;
    }
  }
);

export const sendReviewAction = createAsyncThunk<Review, ReviewData, ThunkOptions>(
  'data/sendReview',
  async ({ cameraId, userName, advantage, disadvantage, rating, review }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<Review>(APIRoute.Reviews, { cameraId, userName, advantage, disadvantage, rating, review });
      dispatch(pushNotification({ type: 'success', message: 'Отзыв добавлен' }));
      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Ошибка отправки отзыва' }));
      throw err;
    }
  }
);
