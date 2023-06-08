import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../../services/api';
import { State } from '../../../types/store';
import { makeFakePromo } from '../../../utils/mocks';
import { APIRoute } from '../../../const';
import { fetchPromoAction } from './api-actions';

describe('Async promo actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch Load_Promo when GET /promo', async () => {
    const promo = makeFakePromo();
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, promo);

    const store = mockStore();

    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type
    ]);
  });
});
