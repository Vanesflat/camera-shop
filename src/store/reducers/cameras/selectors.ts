import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../../const';
import { Camera } from '../../../types/camera';
import { State } from '../../../types/store';
import { sortCameras } from '../../../utils/sort';
import { getCurrentSortOrder, getCurrentSortType } from '../app/selectors';

export const getCameras = (state: State): Camera[] => state[NameSpace.Cameras].cameras;
export const getStatus = (state: State): Status => state[NameSpace.Cameras].status;

export const getCamerasStatus = createSelector([getStatus], (status) => ({
  isLoading: [Status.Idle, Status.Loading].includes(status),
  isSuccess: status === Status.Success,
  isError: status === Status.Error
}));

export const getSortedCameras = createSelector(
  [getCameras, getCurrentSortType, getCurrentSortOrder],
  (cameras, sortType, sortOrder) => sortCameras(cameras, sortType, sortOrder)
);
