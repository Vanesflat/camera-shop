import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getSendReviewStatus } from '../../store/reducers/reviews/selectors';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { changePostStatus } from '../../store/reducers/reviews/reviews';
import Modal from '../modal/modal';

function ReviewSuccessModal(): JSX.Element {
  const sendReviewStatus = useAppSelector(getSendReviewStatus);
  const dispatch = useAppDispatch();

  const handleCloseClick = () => {
    dispatch(changePostStatus());
  };

  return (
    <Modal isOpen={sendReviewStatus.isSuccess} onCloseClick={handleCloseClick}>
      <p className="title title--h4">Спасибо за отзыв</p>
      <svg className="modal__icon" width="80" height="78" aria-hidden="true">
        <use xlinkHref="#icon-review-success"></use>
      </svg>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          onClick={handleCloseClick}
        >
          Вернуться к покупкам
        </button>
      </div>
    </Modal>
  );
}

export default ReviewSuccessModal;
