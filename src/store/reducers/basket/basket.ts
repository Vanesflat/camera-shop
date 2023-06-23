import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import { Camera } from '../../../types/camera';

export type BasketSlice = {
  cameras: Camera[];
  totalCount: number;
};

const initialState: BasketSlice = {
  cameras: [],
  totalCount: 0
};

export const basketSlice = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addCamera: (state, action: PayloadAction<Camera>) => {
      const findedCamera = state.cameras.find((camera) => camera.id === action.payload.id);

      if (findedCamera && findedCamera.count) {
        findedCamera.count++;
        state.totalCount++;
      } else {
        state.cameras.push({ ...action.payload, count: 1 });
        state.totalCount++;
      }
    },
    decrementCameraCount: (state, action: PayloadAction<Camera>) => {
      const findedCamera = state.cameras.find((camera) => camera.id === action.payload.id);

      if (findedCamera && findedCamera.count) {
        findedCamera.count--;
        state.totalCount--;
      }
    },
    removeCamera: (state, action: PayloadAction<Camera>) => {
      state.cameras = state.cameras.filter((camera) => camera.id !== action.payload.id);
      state.totalCount = state.cameras.reduce((acc, camera) => acc + (camera.count as number), 0);
    },
    setCameraCount: (state, action: PayloadAction<{ id: number; count: number }>) => {
      const findedCamera = state.cameras.find((camera) => camera.id === action.payload.id);

      if (findedCamera) {
        findedCamera.count = action.payload.count;
        state.totalCount = state.cameras.reduce((acc, camera) => acc + (camera.count as number), 0);
      }
    }
  }
});

export const {
  addCamera,
  decrementCameraCount,
  removeCamera,
  setCameraCount
} = basketSlice.actions;
