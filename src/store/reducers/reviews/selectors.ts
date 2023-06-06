import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../../const';
import { Review } from '../../../types/review';
import { State } from '../../../types/store';
import { getSortedReviews } from '../../../utils/review';

export const getReviews = (state: State): Review[] => state[NameSpace.Reviews].reviews;
export const getStatus = (state: State): Status => state[NameSpace.Reviews].status;
export const getPostStatus = (state: State): Status => state[NameSpace.Reviews].postStatus;

export const getReviewsStatus = createSelector([getStatus], (status) => ({
  isLoading: [Status.Idle, Status.Loading].includes(status),
  isSuccess: status === Status.Success,
  isError: status === Status.Error
}));

export const getSendReviewStatus = createSelector([getPostStatus], (status) => ({
  isLoading: [Status.Idle, Status.Loading].includes(status),
  isSuccess: status === Status.Success,
  isError: status === Status.Error
}));

export const getRenderedReviews = createSelector([getReviews], (reviews) => getSortedReviews(reviews));
