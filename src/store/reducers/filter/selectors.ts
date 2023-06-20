import { Category, Level, NameSpace, Type } from '../../../const';
import { State } from '../../../types/store';

export const getCurrentCategory = (state: State): Category | null => state[NameSpace.Filter].category;
export const getCurrentTypes = (state: State): Type[] => state[NameSpace.Filter].types;
export const getCurrentLevels = (state: State): Level[] => state[NameSpace.Filter].levels;
export const getCurrentMinPrice = (state: State): number => state[NameSpace.Filter].minPrice;
export const getCurrentMaxPrice = (state: State): number => state[NameSpace.Filter].maxPrice;
