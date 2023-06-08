import { Status } from '../../../const';
import { makeFakeCamera } from '../../../utils/mocks';
import { fetchSimilarCamerasAction } from './api-actions';
import { similarCamerasSlice, SimilarCamerasSlice } from './similar-products';

const similarCameras = Array.from({ length: 5 }, makeFakeCamera);

describe('Reducer: similarCamerasSlice', () => {
  let state: SimilarCamerasSlice;

  beforeEach(() => {
    state = {
      similarCameras: [],
      status: Status.Idle
    };
  });
  it('Should return initial state without additional parameters', () => {
    expect(similarCamerasSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('fetchSimilarCamerasAction test', () => {
    it('Should update status to "LOADING" if fetchSimilarCamerasAction pending', () => {
      expect(similarCamerasSlice.reducer(state, { type: fetchSimilarCamerasAction.pending.type }))
        .toEqual({
          ...state,
          status: Status.Loading
        });
    });

    it('Should load similar cameras and update status to "SUCCESS" if fetchSimilarCamerasAction fulfilled', () => {
      expect(similarCamerasSlice.reducer(state, { type: fetchSimilarCamerasAction.fulfilled.type, payload: similarCameras }))
        .toEqual({
          ...state,
          similarCameras: similarCameras,
          status: Status.Success
        });
    });

    it('Should update status to "ERROR" is fetchSimilarCamerasAction rejected', () => {
      expect(similarCamerasSlice.reducer(state, { type: fetchSimilarCamerasAction.rejected.type }))
        .toEqual({
          ...state,
          status: Status.Error
        });
    });
  });
});
