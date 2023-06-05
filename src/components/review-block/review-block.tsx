import { useState } from 'react';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getRenderedReviews } from '../../store/reducers/reviews/selectors';
import ReviewList from '../review-list/review-list';

const MAX_VISIBLE_REVIEWS_COUNT = 3;

function ReviewBlock(): JSX.Element {
  const reviews = useAppSelector(getRenderedReviews);

  const [endSlice, setEndSlice] = useState(MAX_VISIBLE_REVIEWS_COUNT);
  const renderedReviews = reviews.slice(0, endSlice);

  const handleClick = () => {
    setEndSlice(endSlice + MAX_VISIBLE_REVIEWS_COUNT);
  };

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button">Оставить свой отзыв</button>
          </div>
          <ReviewList reviews={renderedReviews} />
          <div className="review-block__buttons">
            {endSlice < reviews.length &&
              <button
                className="btn btn--purple"
                type="button"
                onClick={handleClick}
              >
                Показать больше отзывов
              </button>}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReviewBlock;
