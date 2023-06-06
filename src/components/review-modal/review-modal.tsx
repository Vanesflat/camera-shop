import cn from 'classnames';
import { useCallback, useEffect } from 'react';
import ReviewForm from '../review-form/review-form';

type ReviewModalProps = {
  isOpen: boolean;
  onCloseClick: () => void;
};

function ReviewModal({ isOpen, onCloseClick }: ReviewModalProps): JSX.Element {
  const onEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      onCloseClick();
    }
  }, [onCloseClick]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onEscapeKeydown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', onEscapeKeydown);
    };
  }, [isOpen, onEscapeKeydown]);

  return (
    <div className={cn('modal', isOpen && 'is-active')}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onCloseClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <ReviewForm isOpen={isOpen} onClose={onCloseClick} />
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={onCloseClick}
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

export default ReviewModal;
