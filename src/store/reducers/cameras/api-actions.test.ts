import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../../services/api';
import { State } from '../../../types/store';
import { makeFakeCamera } from '../../../utils/mocks';
import { APIRoute } from '../../../const';
import { fetchCamerasAction } from './api-actions';

describe('Async cameras actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch Load_Cameras when GET /cameras', async () => {
    const cameras = [makeFakeCamera()];
    mockAPI
      .onGet(APIRoute.Cameras)
      .reply(200, cameras);

    const store = mockStore();

    await store.dispatch(fetchCamerasAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchCamerasAction.pending.type,
      fetchCamerasAction.fulfilled.type
    ]);
  });
});
