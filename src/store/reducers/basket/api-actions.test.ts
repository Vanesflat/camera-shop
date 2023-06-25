import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../../services/api';
import { State } from '../../../types/store';
import { APIRoute } from '../../../const';
import { pushNotification } from '../notifications/notifications';
import { fetchDiscount, postOrder } from './api-actions';
import { makeFakeCamera, makeFakeCoupon } from '../../../utils/mocks';

describe('Async basket actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch Load_Discount when POST /coupons', async () => {
    const coupon = makeFakeCoupon();

    mockAPI
      .onPost(APIRoute.Coupon)
      .reply(200, '');

    const store = mockStore();

    await store.dispatch(fetchDiscount(coupon));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchDiscount.pending.type,
      pushNotification.type,
      fetchDiscount.fulfilled.type
    ]);
  });

  it('should dispatch Send_Order when POST /orders', async () => {
    const camerasIds = [makeFakeCamera()].map((camera) => camera.id);

    mockAPI
      .onPost(APIRoute.Order)
      .reply(200, '');

    const store = mockStore();

    await store.dispatch(postOrder({ camerasIds: camerasIds, coupon: null }));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      postOrder.pending.type,
      postOrder.fulfilled.type
    ]);
  });
});
