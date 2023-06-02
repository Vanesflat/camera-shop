import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../../const';
import { Promo } from '../../../types/promo';
import { ThunkOptions } from '../../../types/store';

export const fetchPromoAction = createAsyncThunk<Promo, undefined, ThunkOptions>(
  'data/fetchPromo',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Promo>(APIRoute.Promo);

      return data;
    } catch {
      throw new Error();
    }
  }
);
