import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../../const';
import { Camera } from '../../../types/camera';
import { fetchCameraAction } from './api-actions';

type CameraSlice = {
  camera: Camera | null;
  status: Status;
};

const initialState: CameraSlice = {
  camera: null,
  status: Status.Idle
};

export const cameraSlice = createSlice({
  name: NameSpace.Camera,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCameraAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchCameraAction.fulfilled, (state, action) => {
        state.camera = action.payload;
        state.status = Status.Success;
      })
      .addCase(fetchCameraAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});
