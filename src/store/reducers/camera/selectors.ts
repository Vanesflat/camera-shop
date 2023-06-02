import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../../const';
import { Camera } from '../../../types/camera';
import { State } from '../../../types/store';

export const getCamera = (state: State): Camera | null => state[NameSpace.Camera].camera;
export const getStatus = (state: State): Status => state[NameSpace.Camera].status;

export const getCameraStatus = createSelector([getStatus], (status) => ({
  isLoading: [Status.Idle, Status.Loading].includes(status),
  isSuccess: status === Status.Success,
  isError: status === Status.Error
}));
