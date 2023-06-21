import { useState } from 'react';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getRenderedReviews } from '../../store/reducers/reviews/selectors';
import ReviewList from '../review-list/review-list';
import ReviewModal from '../review-modal/review-modal';
import ReviewSuccessModal from '../review-success-modal/review-success-modal';
import { MAX_VISIBLE_REVIEWS_COUNT } from './const';

function ReviewBlock(): JSX.Element {
  const reviews = useAppSelector(getRenderedReviews);

  const [openedModal, setOpenedModal] = useState(false);
  const [endSlice, setEndSlice] = useState(MAX_VISIBLE_REVIEWS_COUNT);
  const renderedReviews = reviews.slice(0, endSlice);

  const handleShowMoreClick = () => {
    setEndSlice(endSlice + MAX_VISIBLE_REVIEWS_COUNT);
  };

  const handleAddReviewClick = () => {
    setOpenedModal(true);
  };

  const handleCloseClick = () => {
    setOpenedModal(false);
  };

  return (
    <>
      <div className="page-content__section">
        <section className="review-block">
          <div className="container">
            <div className="page-content__headed">
              <h2 className="title title--h3">Отзывы</h2>
              <button
                className="btn"
                type="button"
                onClick={handleAddReviewClick}
              >
                Оставить свой отзыв
              </button>
            </div>
            <ReviewList reviews={renderedReviews} />
            <div className="review-block__buttons">
              {endSlice < reviews.length &&
                <button
                  className="btn btn--purple"
                  type="button"
                  onClick={handleShowMoreClick}
                >
                  Показать больше отзывов
                </button>}
            </div>
          </div>
        </section>
      </div>
      <ReviewModal isOpen={openedModal} onCloseClick={handleCloseClick} />
      <ReviewSuccessModal />
    </>
  );
}

export default ReviewBlock;
