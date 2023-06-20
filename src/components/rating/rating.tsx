import { getStarsArray } from '../../utils/review';

type RatingProps = {
  rating: number;
  reviewCount: number;
};

function Rating({ rating, reviewCount }: RatingProps): JSX.Element {
  const stars: boolean[] = getStarsArray(rating);

  return (
    <div className="rate product__rate">
      {stars.map((star, i) => (
        <svg width="17" height="16" aria-hidden="true" key={++i}>
          <use xlinkHref={star ? '#icon-full-star' : '#icon-star'}></use>
        </svg>
      ))}
      <p className="visually-hidden">Рейтинг: {rating}</p>
      <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
    </div>
  );
}

export default Rating;
