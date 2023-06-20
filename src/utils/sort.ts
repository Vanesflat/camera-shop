import { SortOrder, SortType } from '../const';
import { Camera } from '../types/camera';

export const sortCameras = (cameras: Camera[], sortType: SortType | null, sortOrder: SortOrder | null): Camera[] => {
  let sortedCamerasByType: Camera[] = [];

  switch (sortType) {
    case SortType.SortPopular:
      sortedCamerasByType = [...cameras].sort((a, b) => a.rating - b.rating);
      break;
    case SortType.SortPrice:
      sortedCamerasByType = [...cameras].sort((a, b) => b.price - a.price);
      break;
    default:
      sortedCamerasByType = [...cameras];
      break;
  }

  let sortedCamerasByOrder: Camera[] = [];

  switch (sortOrder) {
    case SortOrder.Up:
      sortedCamerasByOrder = sortedCamerasByType.reverse();
      break;
    case SortOrder.Down:
      sortedCamerasByOrder = sortedCamerasByType;
      break;
    default:
      sortedCamerasByOrder = [...cameras];
      break;
  }

  return sortedCamerasByOrder;
};
