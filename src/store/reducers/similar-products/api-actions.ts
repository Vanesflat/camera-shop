import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../../const';
import { Camera } from '../../../types/camera';
import { ThunkOptions } from '../../../types/store';

export const fetchSimilarCamerasAction = createAsyncThunk<Camera[], number, ThunkOptions>(
  'data/fetchSimilarCameras',
  async (cameraId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Camera[]>(`${APIRoute.Cameras}/${cameraId}${APIRoute.Similar}`);

      return data;
    } catch {
      throw new Error();
    }
  }
);
