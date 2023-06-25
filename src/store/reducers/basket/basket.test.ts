import { Coupon, Status } from '../../../const';
import { makeFakeCamera } from '../../../utils/mocks';
import { fetchDiscount, postOrder } from './api-actions';
import { addCamera, basketSlice, BasketSlice, decrementCameraCount, removeCamera, resetOrderStatus, setCameraCount, setCoupon } from './basket';

const discount = 10;
const camera = makeFakeCamera();

describe('Reducer: basketSlice', () => {
  let state: BasketSlice;

  beforeEach(() => {
    state = {
      basketCameras: [],
      coupon: null,
      discount: 0,
      discountStatus: Status.Idle,
      orderStatus: Status.Idle,
      totalCount: 0
    };
  });
  it('Should return initial state without additional parameters', () => {
    expect(basketSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  it('Should change totalCount by a add camera', () => {
    expect(basketSlice.reducer(state, addCamera(camera)))
      .toEqual({
        ...state,
        basketCameras: [{ ...camera, count: 1 }],
        totalCount: state.totalCount + 1
      });
  });

  it('Should change camera count by a decrement camera count', () => {
    state.basketCameras = [{ ...camera, count: 2 }];
    state.totalCount = 2;

    expect(basketSlice.reducer(state, decrementCameraCount(camera)))
      .toEqual({
        ...state,
        basketCameras: [{ ...state.basketCameras[0], count: 1 }],
        totalCount: state.totalCount - 1
      });
  });

  it('Should delete camera and change camera count by a remove camera', () => {
    expect(basketSlice.reducer(state, removeCamera(camera)))
      .toEqual(state);
  });

  it('Should change camera count by a set camera count', () => {
    state.basketCameras = [{ ...camera, count: 1 }];
    const payloadCount = 10;

    expect(basketSlice.reducer(state, setCameraCount({ id: state.basketCameras[0].id, count: payloadCount })))
      .toEqual({
        ...state,
        basketCameras: [{ ...state.basketCameras[0], count: payloadCount }],
        totalCount: payloadCount
      });
  });

  it('Should change coupon by a given coupon', () => {
    expect(basketSlice.reducer(state, setCoupon(Coupon.First)))
      .toEqual({
        ...state,
        coupon: Coupon.First
      });
  });

  it('Should reset orderStatus by a given reset order status', () => {
    expect(basketSlice.reducer(state, resetOrderStatus()))
      .toEqual(state);
  });

  describe('fetchDiscount test', () => {
    it('Should update discountStatus to "LOADING" if fetchDiscount pending', () => {
      expect(basketSlice.reducer(state, { type: fetchDiscount.pending.type }))
        .toEqual({
          ...state,
          discountStatus: Status.Loading
        });
    });

    it('Should load discount and update discountStatus status to "SUCCESS" if fetchDiscount fulfilled', () => {
      expect(basketSlice.reducer(state, { type: fetchDiscount.fulfilled.type, payload: discount }))
        .toEqual({
          ...state,
          discount: discount,
          discountStatus: Status.Success
        });
    });

    it('Should update discountStatus to "ERROR" is fetchDiscount rejected', () => {
      expect(basketSlice.reducer(state, { type: fetchDiscount.rejected.type }))
        .toEqual({
          ...state,
          discountStatus: Status.Error
        });
    });
  });

  describe('postOrder test', () => {
    it('Should update orderStatus to "LOADING" if postOrder pending', () => {
      expect(basketSlice.reducer(state, { type: postOrder.pending.type }))
        .toEqual({
          ...state,
          orderStatus: Status.Loading
        });
    });

    it('Should update orderStatus status to "SUCCESS" if postOrder fulfilled', () => {
      expect(basketSlice.reducer(state, { type: postOrder.fulfilled.type }))
        .toEqual({
          ...state,
          orderStatus: Status.Success
        });
    });

    it('Should update orderStatus to "ERROR" is postOrder rejected', () => {
      expect(basketSlice.reducer(state, { type: postOrder.rejected.type }))
        .toEqual({
          ...state,
          orderStatus: Status.Error
        });
    });
  });
});
