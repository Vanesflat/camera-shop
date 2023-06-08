import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../../services/api';
import { State } from '../../../types/store';
import { makeFakeCamera } from '../../../utils/mocks';
import { APIRoute } from '../../../const';
import { fetchSimilarCamerasAction } from './api-actions';

describe('Async similar cameras actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch Load_Similar_Cameras when GET /similar', async () => {
    const similarCameras = [makeFakeCamera()];
    const camera = makeFakeCamera();
    mockAPI
      .onGet(`${APIRoute.Cameras}/${camera.id}${APIRoute.Similar}`)
      .reply(200, similarCameras);

    const store = mockStore();

    await store.dispatch(fetchSimilarCamerasAction(camera.id));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchSimilarCamerasAction.pending.type,
      fetchSimilarCamerasAction.fulfilled.type
    ]);
  });
});
