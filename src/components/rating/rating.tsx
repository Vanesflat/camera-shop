import { Review } from '../../types/review';
import { getAverageRate, getStarsArray } from '../../utils/review';

type RatingProps = {
  reviews: Review[];
};

function Rating({ reviews }: RatingProps): JSX.Element {
  const averageRate = getAverageRate(reviews);
  const stars: boolean[] = getStarsArray(averageRate);

  return (
    <div className="rate product__rate">
      {stars.map((star, i) => (
        <svg width="17" height="16" aria-hidden="true" key={++i}>
          <use xlinkHref={star ? '#icon-full-star' : '#icon-star'}></use>
        </svg>
      ))}
      <p className="visually-hidden">Рейтинг: {averageRate}</p>
      <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviews.length}</p>
    </div>
  );
}

export default Rating;
