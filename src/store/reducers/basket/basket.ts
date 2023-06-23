import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../../const';
import { Camera } from '../../../types/camera';
import { fetchDiscount } from './api-actions';

export type BasketSlice = {
  cameras: Camera[];
  totalCount: number;
  discount: number;
  status: Status;
};

const initialState: BasketSlice = {
  cameras: [],
  totalCount: 0,
  discount: 0,
  status: Status.Idle
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
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDiscount.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchDiscount.fulfilled, (state, action) => {
        state.discount = action.payload;
        state.status = Status.Success;
      })
      .addCase(fetchDiscount.rejected, (state) => {
        state.status = Status.Error;
      });
  },
});

export const {
  addCamera,
  decrementCameraCount,
  removeCamera,
  setCameraCount
} = basketSlice.actions;
