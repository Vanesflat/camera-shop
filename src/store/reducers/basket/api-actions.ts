import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, Coupon } from '../../../const';
import { ThunkOptions } from '../../../types/store';
import { pushNotification } from '../notifications/notifications';

export const fetchDiscount = createAsyncThunk<number, Coupon, ThunkOptions>(
  'data/fetchDiscount',
  async (coupon, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<number>(APIRoute.Coupon, { coupon });
      dispatch(pushNotification({ type: 'success', message: 'Скидка получена' }));

      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Ошибка получения скидки' }));
      throw err;
    }
  }
);

export const postOrder = createAsyncThunk<number, { camerasIds: number[]; coupon: Coupon | null }, ThunkOptions>(
  'data/postOrder',
  async ({ camerasIds, coupon }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<number>(APIRoute.Order, { camerasIds, coupon });

      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Ошибка оформления заказа' }));
      throw err;
    }
  }
);
