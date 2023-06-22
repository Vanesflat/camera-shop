export const formatPrice = (price: number): string => price.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1 ');

export const capitalizeFirstLetter = (str: string): string => str[0].toUpperCase() + str.slice(1);

export const getTotalProductPrice = (price: number, count?: number) => {
  if (!count) {
    return price;
  }

  return price * count;
};
