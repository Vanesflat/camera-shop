import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../../const';
import { Camera } from '../../../types/camera';
import { State } from '../../../types/store';

export const getBasketCameras = (state: State): Camera[] => state[NameSpace.Basket].cameras;
export const getTotalCount = (state: State): number => state[NameSpace.Basket].totalCount;
export const getDiscountPercent = (state: State): number => state[NameSpace.Basket].discount;
export const getStatus = (state: State): Status => state[NameSpace.Basket].status;

export const getDiscountStatus = createSelector([getStatus], (status) => ({
  isLoading: status === Status.Loading,
  isSuccess: status === Status.Success,
  isError: status === Status.Error
}));
