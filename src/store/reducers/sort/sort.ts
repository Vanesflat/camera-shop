import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, SortType, SortOrder } from '../../../const';

export type SortSlice = {
  sortType: SortType | null;
  sortOrder: SortOrder | null;
}

const initialState: SortSlice = {
  sortType: null,
  sortOrder: null
};

export const sortSlice = createSlice({
  name: NameSpace.Sort,
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
} = sortSlice.actions;
