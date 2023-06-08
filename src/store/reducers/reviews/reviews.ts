import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../../const';
import { Review } from '../../../types/review';
import { fetchReviewsAction, sendReviewAction } from './api-actions';

export type ReviewsSlice = {
  reviews: Review[];
  status: Status;
  postStatus: Status;
};

const initialState: ReviewsSlice = {
  reviews: [],
  status: Status.Idle,
  postStatus: Status.Idle
};

export const reviewsSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    changePostStatus: (state) => {
      state.postStatus = Status.Idle;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.status = Status.Success;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.status = Status.Error;
      })
      .addCase(sendReviewAction.pending, (state) => {
        state.postStatus = Status.Loading;
      })
      .addCase(sendReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.postStatus = Status.Success;
      })
      .addCase(sendReviewAction.rejected, (state) => {
        state.postStatus = Status.Error;
      });
  }
});

export const { changePostStatus } = reviewsSlice.actions;
