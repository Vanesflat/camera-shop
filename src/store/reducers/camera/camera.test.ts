import { Status } from '../../../const';
import { makeFakeCamera } from '../../../utils/mocks';
import { fetchCameraAction } from './api-actions';
import { cameraSlice, CameraSlice } from './camera';

const camera = makeFakeCamera();

describe('Reducer: cameraSlice', () => {
  let state: CameraSlice;

  beforeEach(() => {
    state = {
      camera: null,
      status: Status.Idle
    };
  });
  it('Should return initial state without additional parameters', () => {
    expect(cameraSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('fetchCameraAction test', () => {
    it('Should update status to "LOADING" if fetchCameraAction pending', () => {
      expect(cameraSlice.reducer(state, { type: fetchCameraAction.pending.type }))
        .toEqual({
          ...state,
          status: Status.Loading
        });
    });

    it('Should load camera and update status to "SUCCESS" if fetchCameraAction fulfilled', () => {
      expect(cameraSlice.reducer(state, { type: fetchCameraAction.fulfilled.type, payload: camera }))
        .toEqual({
          ...state,
          camera: camera,
          status: Status.Success
        });
    });

    it('Should update status to "ERROR" is fetchCameraAction rejected', () => {
      expect(cameraSlice.reducer(state, { type: fetchCameraAction.rejected.type }))
        .toEqual({
          ...state,
          status: Status.Error
        });
    });
  });
});
