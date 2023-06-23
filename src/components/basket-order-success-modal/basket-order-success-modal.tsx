import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { resetOrderStatus } from '../../store/reducers/basket/basket';
import { getOrderStatus } from '../../store/reducers/basket/selectors';
import Modal from '../modal/modal';

function BasketOrderSuccessModal(): JSX.Element {
  const orderStatus = useAppSelector(getOrderStatus);
  const dispatch = useAppDispatch();

  const handleCloseClick = () => {
    dispatch(resetOrderStatus());
  };

  return (
    <Modal isOpen={orderStatus.isSuccess} onCloseClick={handleCloseClick}>
      <p className="title title--h4">Спасибо за покупку</p>
      <svg className="modal__icon" width="80" height="78" aria-hidden="true">
        <use xlinkHref="#icon-review-success"></use>
      </svg>
      <div className="modal__buttons">
        <Link
          className="btn btn--purple modal__btn modal__btn--fit-width"
          to={AppRoute.Main}
          onClick={handleCloseClick}
        >
          Вернуться к покупкам
        </Link>
      </div>
    </Modal>
  );
}

export default BasketOrderSuccessModal;
