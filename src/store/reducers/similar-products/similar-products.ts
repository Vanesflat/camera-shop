import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../../const';
import { Camera } from '../../../types/camera';
import { fetchSimilarCamerasAction } from './api-actions';

type CamerasSlice = {
  similarCameras: Camera[];
  status: Status;
};

const initialState: CamerasSlice = {
  similarCameras: [],
  status: Status.Idle
};

export const similaraCamerasSlice = createSlice({
  name: NameSpace.SimilarCameras,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSimilarCamerasAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
        state.status = Status.Success;
      })
      .addCase(fetchSimilarCamerasAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});
