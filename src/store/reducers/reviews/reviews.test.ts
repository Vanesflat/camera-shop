import { Status } from '../../../const';
import { makeFakeReview } from '../../../utils/mocks';
import { fetchReviewsAction, sendReviewAction } from './api-actions';
import { reviewsSlice, ReviewsSlice } from './reviews';

const reviews = [makeFakeReview()];

describe('Reducer: reviewsSlice', () => {
  let state: ReviewsSlice;

  beforeEach(() => {
    state = {
      reviews: [],
      status: Status.Idle,
      postStatus: Status.Idle
    };
  });

  it('Should return initial state without additional parameters', () => {
    expect(reviewsSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('fetchReviewsAction test', () => {
    it('Should update status to "LOADING" if fetchReviewsAction pending', () => {
      expect(reviewsSlice.reducer(state, { type: fetchReviewsAction.pending.type }))
        .toEqual({
          ...state,
          status: Status.Loading
        });
    });

    it('Should load reviews and update status to "SUCCESS" if fetchReviewsAction fulfilled', () => {
      expect(reviewsSlice.reducer(state, { type: fetchReviewsAction.fulfilled.type, payload: reviews }))
        .toEqual({
          ...state,
          reviews: reviews,
          status: Status.Success
        });
    });

    it('Should update status to "ERROR" if fetchReviewsAction rejected', () => {
      expect(reviewsSlice.reducer(state, { type: fetchReviewsAction.rejected.type }))
        .toEqual({
          ...state,
          status: Status.Error
        });
    });
  });

  describe('sendReviewAction test', () => {
    it('Should update postStatus is sendReviewAction pending', () => {
      expect(reviewsSlice.reducer(state, { type: sendReviewAction.pending.type }))
        .toEqual({
          ...state,
          postStatus: Status.Loading
        });
    });

    it('Should update reviews and postStatus is sendReviewAction fulfilled', () => {
      const review = makeFakeReview();

      expect(reviewsSlice.reducer(state, { type: sendReviewAction.fulfilled.type, payload: review }))
        .toEqual({
          ...state,
          reviews: [review],
          postStatus: Status.Success
        });
    });

    it('Should update postStatus is sendReviewAction rejected', () => {
      expect(reviewsSlice.reducer(state, { type: sendReviewAction.rejected.type }))
        .toEqual({
          ...state,
          postStatus: Status.Error
        });
    });
  });
});
