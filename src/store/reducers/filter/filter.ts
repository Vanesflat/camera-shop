import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, Level, Type, Category } from '../../../const';

export type FilterSlice = {
  category: Category | null;
  types: Type[];
  levels: Level[];
  minPrice: number;
  maxPrice: number;
}

const initialState: FilterSlice = {
  category: null,
  types: [],
  levels: [],
  minPrice: 0,
  maxPrice: 0
};

export const filterSlice = createSlice({
  name: NameSpace.Filter,
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<Category | null>) => {
      state.category = action.payload;
    },
    changeType: (state, action: PayloadAction<Type>) => {
      if (state.types.includes(action.payload)) {
        state.types = state.types.filter((type) => type !== action.payload);

        return;
      }

      state.types.push(action.payload);
    },
    changeLevel: (state, action: PayloadAction<Level>) => {
      if (state.levels.includes(action.payload)) {
        state.levels = state.levels.filter((level) => level !== action.payload);

        return;
      }

      state.levels.push(action.payload);
    },
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },
    resetFilters: (state) => {
      state.category = null;
      state.types = [];
      state.levels = [];
      state.minPrice = 0;
      state.maxPrice = 0;
    }
  }
});

export const {
  changeCategory,
  changeLevel,
  changeType,
  setMinPrice,
  setMaxPrice,
  resetFilters
} = filterSlice.actions;
