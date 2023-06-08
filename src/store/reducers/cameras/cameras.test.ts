import { Status } from '../../../const';
import { makeFakeCamera } from '../../../utils/mocks';
import { fetchCamerasAction } from './api-actions';
import { camerasSlice, CamerasSlice } from './cameras';

const cameras = Array.from({length: 5}, makeFakeCamera);

describe('Reducer: camerasSlice', () => {
  let state: CamerasSlice;

  beforeEach(() => {
    state = {
      cameras: [],
      status: Status.Idle
    };
  });
  it('Should return initial state without additional parameters', () => {
    expect(camerasSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('fetchCamerasAction test', () => {
    it('Should update status to "LOADING" if fetchCamerasAction pending', () => {
      expect(camerasSlice.reducer(state, { type: fetchCamerasAction.pending.type }))
        .toEqual({
          ...state,
          status: Status.Loading
        });
    });

    it('Should load cameras and update status to "SUCCESS" if fetchCamerasAction fulfilled', () => {
      expect(camerasSlice.reducer(state, { type: fetchCamerasAction.fulfilled.type, payload: cameras }))
        .toEqual({
          ...state,
          cameras: cameras,
          status: Status.Success
        });
    });

    it('Should update status to "ERROR" is fetchCamerasAction rejected', () => {
      expect(camerasSlice.reducer(state, { type: fetchCamerasAction.rejected.type }))
        .toEqual({
          ...state,
          status: Status.Error
        });
    });
  });
});
