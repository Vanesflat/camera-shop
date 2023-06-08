import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../../services/api';
import { State } from '../../../types/store';
import { makeFakeCamera, makeFakeReview } from '../../../utils/mocks';
import { APIRoute } from '../../../const';
import { fetchReviewsAction, sendReviewAction } from './api-actions';

describe('Async reviews actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch Load_Reviews when GET /reviews', async () => {
    const camera = makeFakeCamera();
    const reviews = [makeFakeReview()];
    mockAPI
      .onGet(`${APIRoute.Cameras}/${camera.id}${APIRoute.Reviews}`)
      .reply(200, reviews);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(camera.id));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type
    ]);
  });

  it('should dispatch Send_Review when POST /reviews', async () => {
    const reviews = [makeFakeReview()];
    const review = makeFakeReview();

    mockAPI
      .onPost(APIRoute.Reviews)
      .reply(200, reviews);

    const store = mockStore();

    await store.dispatch(sendReviewAction(review));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      sendReviewAction.pending.type,
      sendReviewAction.fulfilled.type
    ]);
  });
});
