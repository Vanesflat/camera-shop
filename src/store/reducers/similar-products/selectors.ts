import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../../const';
import { Camera } from '../../../types/camera';
import { State } from '../../../types/store';

export const getSimilarCameras = (state: State): Camera[] => state[NameSpace.SimilarCameras].similarCameras;
export const getStatus = (state: State): Status => state[NameSpace.SimilarCameras].status;

export const getSimilarCamerasStatus = createSelector([getStatus], (status) => ({
  isLoading: [Status.Idle, Status.Loading].includes(status),
  isSuccess: status === Status.Success,
  isError: status === Status.Error
}));
