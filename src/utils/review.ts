import { STARS_COUNT } from '../const';
import { Review } from '../types/review';

export const convertDate = (date: string): string => new Date(date).toLocaleString('ru-RU', { day: '2-digit', month: 'long' });

export const convertToTwoDigit = (value: number): number | string => value < 10 ? `0${value}` : value;

export const convertDateForDateTime = (date: string): string => {
  const d = new Date(date);

  return `${d.getFullYear()}-${convertToTwoDigit(d.getMonth() + 1)}-${convertToTwoDigit(d.getDate() - 1)}`;
};

export const getStarsArray = (rating: number): boolean[] => {
  let count = rating;
  const result: boolean[] = [];

  while (result.length !== STARS_COUNT) {
    if (count) {
      result.push(true);
      count--;
    } else {
      result.push(false);
    }
  }

  return result;
};

export const getSortedReviews = (reviews: Review[]): Review[] => [...reviews].sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt));
