import { NameSpace } from '../../../const';
import { Camera } from '../../../types/camera';
import { State } from '../../../types/store';

export const getBasketCameras = (state: State): Camera[] => state[NameSpace.Basket].cameras;
export const getTotalCount = (state: State): number => state[NameSpace.Basket].totalCount;
