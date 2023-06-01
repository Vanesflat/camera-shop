import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../../const';
import { Camera } from '../../../types/camera';
import { ThunkOptions } from '../../../types/store';

export const fetchCamerasAction = createAsyncThunk<Camera[], undefined, ThunkOptions>(
  'data/fetchCameras',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Camera[]>(APIRoute.Cameras);

      return data;
    } catch {
      throw new Error();
    }
  }
);
