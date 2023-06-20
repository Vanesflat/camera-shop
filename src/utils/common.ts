export const formatPrice = (price: number): string => price.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1 ');

export const ucFirst = (str: string): string => str[0].toUpperCase() + str.slice(1);
