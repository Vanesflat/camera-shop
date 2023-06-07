import { useCallback, useEffect } from 'react';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getSendReviewStatus } from '../../store/reducers/reviews/selectors';
import cn from 'classnames';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { changePostStatus } from '../../store/reducers/reviews/reviews';

function ReviewSuccessModal(): JSX.Element {
  const sendReviewStatus = useAppSelector(getSendReviewStatus);
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    dispatch(changePostStatus());
  }, [dispatch]);

  const onEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      handleClick();
    }
  }, [handleClick]);

  useEffect(() => {
    if (sendReviewStatus.isSuccess) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onEscapeKeydown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', onEscapeKeydown);
    };
  }, [onEscapeKeydown, sendReviewStatus.isSuccess]);

  return (
    <div className={cn('modal modal--narrow', sendReviewStatus.isSuccess && 'is-active')}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              onClick={handleClick}
            >
              Вернуться к покупкам
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={handleClick}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewSuccessModal;
