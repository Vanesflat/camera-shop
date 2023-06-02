import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../../const';
import { Promo } from '../../../types/promo';
import { State } from '../../../types/store';

export const getPromo = (state: State): Promo | null => state[NameSpace.Promo].promo;
export const getStatus = (state: State): Status => state[NameSpace.Promo].status;

export const getPromoStatus = createSelector([getStatus], (status) => ({
  isLoading: [Status.Idle, Status.Loading].includes(status),
  isSuccess: status === Status.Success,
  isError: status === Status.Error
}));
