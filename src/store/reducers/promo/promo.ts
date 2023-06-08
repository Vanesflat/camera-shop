import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../../const';
import { Promo } from '../../../types/promo';
import { fetchPromoAction } from './api-actions';

export type PromoSlice = {
  promo: Promo | null;
  status: Status;
};

const initialState: PromoSlice = {
  promo: null,
  status: Status.Idle
};

export const promoSlice = createSlice({
  name: NameSpace.Camera,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.status = Status.Success;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});
