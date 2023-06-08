import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../../services/api';
import { State } from '../../../types/store';
import { makeFakeCamera } from '../../../utils/mocks';
import { APIRoute } from '../../../const';
import { fetchCameraAction } from './api-actions';

describe('Async camera actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch Load_Camera when GET /cameras', async () => {
    const camera = makeFakeCamera();
    mockAPI
      .onGet(`${APIRoute.Cameras}/${camera.id}`)
      .reply(200, camera);

    const store = mockStore();

    await store.dispatch(fetchCameraAction(camera.id));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchCameraAction.pending.type,
      fetchCameraAction.fulfilled.type
    ]);
  });
});
