import { createSelector } from '@reduxjs/toolkit';
import { Coupon, NameSpace, Status } from '../../../const';
import { Camera } from '../../../types/camera';
import { State } from '../../../types/store';

export const getBasketCameras = (state: State): Camera[] => state[NameSpace.Basket].cameras;
export const getTotalCount = (state: State): number => state[NameSpace.Basket].totalCount;
export const getDiscountPercent = (state: State): number => state[NameSpace.Basket].discount;
export const getFetchDiscountStatus = (state: State): Status => state[NameSpace.Basket].discountStatus;
export const getCoupon = (state: State): Coupon | null => state[NameSpace.Basket].coupon;
export const getPostOrderStatus = (state: State): Status => state[NameSpace.Basket].orderStatus;

export const getDiscountStatus = createSelector([getFetchDiscountStatus], (status) => ({
  isLoading: status === Status.Loading,
  isSuccess: status === Status.Success,
  isError: status === Status.Error
}));

export const getOrderStatus = createSelector([getPostOrderStatus], (status) => ({
  isLoading: status === Status.Loading,
  isSuccess: status === Status.Success,
  isError: status === Status.Error
}));
