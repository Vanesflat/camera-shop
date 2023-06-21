import { Category, Level, Type } from '../../../const';
import { changeCategory, changeLevel, changeType, FilterSlice, filterSlice, resetFilters, setMaxPrice, setMinPrice } from './filter';

describe('Reducer: filterSlice', () => {
  let state: FilterSlice;

  beforeEach(() => {
    state = {
      category: null,
      types: [],
      levels: [],
      minPrice: 0,
      maxPrice: 0
    };
  });

  it('Should return initial state without additional parameters', () => {
    expect(filterSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  it('Should change current category by a given category', () => {
    expect(filterSlice.reducer(state, changeCategory(Category.Camera)))
      .toEqual({
        ...state,
        category: Category.Camera
      });
  });

  it('Should change current types by a given type', () => {
    expect(filterSlice.reducer(state, changeType(Type.Collectible)))
      .toEqual({
        ...state,
        types: [Type.Collectible]
      });
  });

  it('Should change current levels by a given level', () => {
    expect(filterSlice.reducer(state, changeLevel(Level.Amateur)))
      .toEqual({
        ...state,
        levels: [Level.Amateur]
      });
  });

  it('Should set min price', () => {
    expect(filterSlice.reducer(state, setMinPrice(100)))
      .toEqual({
        ...state,
        minPrice: 100
      });
  });

  it('Should set max price', () => {
    expect(filterSlice.reducer(state, setMaxPrice(100)))
      .toEqual({
        ...state,
        maxPrice: 100
      });
  });

  it('Should reset all filters', () => {
    expect(filterSlice.reducer(state, resetFilters()))
      .toEqual(state);
  });
});
