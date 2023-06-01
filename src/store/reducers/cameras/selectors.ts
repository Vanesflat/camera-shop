import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../../const';
import { Camera } from '../../../types/camera';
import { State } from '../../../types/store';

export const getCameras = (state: State): Camera[] => state[NameSpace.Cameras].cameras;
export const getStatus = (state: State): Status => state[NameSpace.Cameras].status;

export const getCamerasStatus = createSelector([getStatus], (status) => ({
  isLoading: [Status.Idle, Status.Loading].includes(status),
  isSuccess: status === Status.Success,
  isError: status === Status.Error
}));