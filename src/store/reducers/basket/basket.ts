import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import { Camera } from '../../../types/camera';

export type BasketSlice = {
  cameras: Camera[];
};

const initialState: BasketSlice = {
  cameras: [],
};

export const basketSlice = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addCamera: (state, action: PayloadAction<Camera>) => {
      const findedCamera = state.cameras.find((camera) => camera.id === action.payload.id);

      if (findedCamera && findedCamera.count) {
        findedCamera.count++;
      } else {
        state.cameras.push({ ...action.payload, count: 1 });
      }
    },
  }
});

export const {
  addCamera
} = basketSlice.actions;
