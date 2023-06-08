import { Review } from '../../types/review';
import { convertDate, convertDateForDateTime, getStarsArray } from '../../utils/review';

type ReviewItemProps = {
  review: Review;
};

function ReviewItem({ review }: ReviewItemProps): JSX.Element {
  const stars: boolean[] = getStarsArray(review.rating);

  return (
    <li className="review-card" data-testid="review-item">
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time className="review-card__data" dateTime={convertDateForDateTime(review.createAt)}>{convertDate(review.createAt)}</time>
      </div>
      <div className="rate review-card__rate">
        {stars.map((star, i) => (
          <svg width="17" height="16" aria-hidden="true" key={++i}>
            <use xlinkHref={star ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
        ))}
        <p className="visually-hidden">Оценка: {review.rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{review.advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{review.disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review.review}</p>
        </li>
      </ul>
    </li>

  );
}

export default ReviewItem;
