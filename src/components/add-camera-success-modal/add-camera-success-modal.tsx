import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import Modal from '../modal/modal';

type AddCameraSuccessModalProps = {
  isOpen: boolean;
  onCloseCLick: () => void;
};

function AddCameraSuccessModal({ isOpen, onCloseCLick }: AddCameraSuccessModalProps): JSX.Element {
  const navigate = useNavigate();

  const handleContinueClick = () => {
    navigate(AppRoute.Main);
    onCloseCLick();
  };

  return (
    <Modal isOpen={isOpen} onCloseClick={onCloseCLick}>
      <p className="title title--h4">Товар успешно добавлен в корзину</p>
      <svg className="modal__icon" width="86" height="80" aria-hidden="true">
        <use xlinkHref="#icon-success"></use>
      </svg>
      <div className="modal__buttons">
        <button className="btn btn--transparent modal__btn" onClick={handleContinueClick}>Продолжить покупки</button>
        <Link className="btn btn--purple modal__btn modal__btn--fit-width" to={AppRoute.Basket}>Перейти в корзину</Link>
      </div>
    </Modal>
  );
}

export default AddCameraSuccessModal;
