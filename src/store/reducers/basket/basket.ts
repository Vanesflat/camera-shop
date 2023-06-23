import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coupon, NameSpace, Status } from '../../../const';
import { Camera } from '../../../types/camera';
import { fetchDiscount, postOrder } from './api-actions';

export type BasketSlice = {
  basketCameras: Camera[];
  totalCount: number;
  discount: number;
  discountStatus: Status;
  coupon: Coupon | null;
  orderStatus: Status;
};

const initialState: BasketSlice = {
  basketCameras: [],
  totalCount: 0,
  discount: 0,
  discountStatus: Status.Idle,
  coupon: null,
  orderStatus: Status.Idle
};

export const basketSlice = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addCamera: (state, action: PayloadAction<Camera>) => {
      const findedCamera = state.basketCameras.find((camera) => camera.id === action.payload.id);

      if (findedCamera && findedCamera.count) {
        findedCamera.count++;
        state.totalCount++;
      } else {
        state.basketCameras.push({ ...action.payload, count: 1 });
        state.totalCount++;
      }
    },
    decrementCameraCount: (state, action: PayloadAction<Camera>) => {
      const findedCamera = state.basketCameras.find((camera) => camera.id === action.payload.id);

      if (findedCamera && findedCamera.count) {
        findedCamera.count--;
        state.totalCount--;
      }
    },
    removeCamera: (state, action: PayloadAction<Camera>) => {
      state.basketCameras = state.basketCameras.filter((camera) => camera.id !== action.payload.id);
      state.totalCount = state.basketCameras.reduce((acc, camera) => acc + (camera.count as number), 0);
    },
    setCameraCount: (state, action: PayloadAction<{ id: number; count: number }>) => {
      const findedCamera = state.basketCameras.find((camera) => camera.id === action.payload.id);

      if (findedCamera) {
        findedCamera.count = action.payload.count;
        state.totalCount = state.basketCameras.reduce((acc, camera) => acc + (camera.count as number), 0);
      }
    },
    setCoupon: (state, action: PayloadAction<Coupon>) => {
      state.coupon = action.payload;
    },
    resetOrderStatus: (state) => {
      state.orderStatus = Status.Idle;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDiscount.pending, (state) => {
        state.discountStatus = Status.Loading;
      })
      .addCase(fetchDiscount.fulfilled, (state, action) => {
        state.discount = action.payload;
        state.discountStatus = Status.Success;
      })
      .addCase(fetchDiscount.rejected, (state) => {
        state.discountStatus = Status.Error;
      })
      .addCase(postOrder.pending, (state) => {
        state.orderStatus = Status.Loading;
      })
      .addCase(postOrder.fulfilled, (state) => {
        state.basketCameras = [];
        state.totalCount = 0;
        state.discount = 0;
        state.coupon = null;
        state.orderStatus = Status.Success;
      })
      .addCase(postOrder.rejected, (state) => {
        state.orderStatus = Status.Error;
      });
  },
});

export const {
  addCamera,
  decrementCameraCount,
  removeCamera,
  setCameraCount,
  setCoupon,
  resetOrderStatus
} = basketSlice.actions;
