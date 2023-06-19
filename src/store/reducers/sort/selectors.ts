import { NameSpace, SortType, SortOrder } from '../../../const';
import { State } from '../../../types/store';

export const getCurrentSortType = (state: State): SortType | null => state[NameSpace.Sort].sortType;
export const getCurrentSortOrder = (state: State): SortOrder | null => state[NameSpace.Sort].sortOrder;
