import { BasketItemType } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { removeCamera } from '../../store/reducers/basket/basket';
import { Camera } from '../../types/camera';
import BasketItem from '../basket-item/basket-item';
import Modal from '../modal/modal';

type BasketRemoveCameraModalProps = {
  camera: Camera;
  isOpen: boolean;
  onCloseCLick: () => void;
};

function BasketRemoveCameraModal({ camera, isOpen, onCloseCLick }: BasketRemoveCameraModalProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(removeCamera(camera));
    onCloseCLick();
  };

  return (
    <Modal isOpen={isOpen} onCloseClick={onCloseCLick}>
      <p className="title title--h4">Удалить этот товар?</p>
      <BasketItem camera={camera} type={BasketItemType.Remove} />
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--half-width"
          type="button"
          onClick={handleClick}
        >
          Удалить
        </button>
        <button
          className="btn btn--transparent modal__btn modal__btn--half-width"
          onClick={onCloseCLick}
        >
          Продолжить покупки
        </button>
      </div>
    </Modal>
  );
}

export default BasketRemoveCameraModal;
