import { Camera } from '../types/camera';

export const formatPrice = (price: number): string => price.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1 ');

export const capitalizeFirstLetter = (str: string): string => str[0].toUpperCase() + str.slice(1);

export const getTotalProductPrice = (price: number, count?: number) => {
  if (!count) {
    return price;
  }

  return price * count;
};

export const getTotalPrice = (cameras: Camera[]) => cameras.reduce((acc, camera) => {
  const productTotalPrice = getTotalProductPrice(camera.price, camera.count);

  return acc + productTotalPrice;
}, 0);

export const getDiscount = (totalPrice: number, discount: number) => Math.round(totalPrice / 100 * discount);

export const getFinalPrice = (totalPrice: number, discount: number) => totalPrice - discount;
