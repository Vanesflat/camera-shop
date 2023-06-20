import { Category, Level, Type } from '../const';
import { Camera } from '../types/camera';

export const filterCamerasByCategory = (cameras: Camera[], category: Category | null): Camera[] => {
  if (!category) {
    return cameras;
  }

  return cameras.filter((camera) => camera.category === category);
};

export const filterCamerasByTypes = (cameras: Camera[], types: Type[]): Camera[] => {
  if (!types.length) {
    return cameras;
  }

  return cameras.filter((camera) => types.includes(camera.type));
};

export const filterCamerasByLevels = (cameras: Camera[], levels: Level[]): Camera[] => {
  if (!levels.length) {
    return cameras;
  }

  return cameras.filter((camera) => levels.includes(camera.level));
};

export const getPrice = (cameras: Camera[], type: 'max' | 'min'): string => {
  if (!cameras.length) {
    return '';
  }

  const sortedCameras = [...cameras].sort((a, b) => a.price - b.price);

  if (type === 'max' && sortedCameras.length) {
    return sortedCameras[sortedCameras.length - 1].price.toString();
  } else {
    return sortedCameras[0].price.toString();
  }
};

export const filterCamerasByPrice = (cameras: Camera[], minPrice: number, maxPrice: number): Camera[] => {
  if (!minPrice && !maxPrice) {
    return cameras;
  }

  if (!maxPrice) {
    maxPrice = Infinity;
  }

  return cameras.filter((camera) => camera.price >= minPrice && camera.price <= maxPrice);
};

export const filterCameras = (cameras: Camera[], category: Category | null, types: Type[], levels: Level[], minPrice: number, maxPrice: number): Camera[] => {
  const filteredCamerasByCategory = filterCamerasByCategory(cameras, category);
  const filteredCamerasByTypes = filterCamerasByTypes(filteredCamerasByCategory, types);
  const filteredCamerasByLevels = filterCamerasByLevels(filteredCamerasByTypes, levels);
  const filteredCamerasByPrice = filterCamerasByPrice(filteredCamerasByLevels, minPrice, maxPrice);

  return filteredCamerasByPrice;
};

