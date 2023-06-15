import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, SortType, SortOrder } from '../../../const';

export type AppSlice = {
  sortType: SortType | null;
  sortOrder: SortOrder | null;
}

const initialState: AppSlice = {
  sortType: null,
  sortOrder: null
};

export const appSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;

      if (!state.sortOrder) {
        state.sortOrder = SortOrder.Up;
      }
    },
    changeSortOrder: (state, action: PayloadAction<SortOrder>) => {
      state.sortOrder = action.payload;

      if (!state.sortType) {
        state.sortType = SortType.SortPrice;
      }
    }
  }
});

export const {
  changeSortType,
  changeSortOrder
} = appSlice.actions;
