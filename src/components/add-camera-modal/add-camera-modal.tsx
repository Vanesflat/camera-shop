import { BasketItemType } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { addCamera } from '../../store/reducers/basket/basket';
import { Camera } from '../../types/camera';
import BasketItem from '../basket-item/basket-item';
import Modal from '../modal/modal';

type AddCameraModalProps = {
  camera: Camera;
  isOpen: boolean;
  onCloseCLick: () => void;
  setOpenedAddSuccessModal: (arg: boolean) => void;
};

function AddCameraModal({ camera, isOpen, onCloseCLick, setOpenedAddSuccessModal }: AddCameraModalProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(addCamera(camera));

    setOpenedAddSuccessModal(true);
    onCloseCLick();
  };

  return (
    <Modal isOpen={isOpen} onCloseClick={onCloseCLick}>
      <p className="title title--h4">Добавить товар в корзину</p>
      <BasketItem camera={camera} type={BasketItemType.Add} />
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          onClick={handleClick}
        >
          <svg width="24" height="16" aria-hidden="true">
            <use xlinkHref="#icon-add-basket"></use>
          </svg>Добавить в корзину
        </button>
      </div>
    </Modal>
  );
}

export default AddCameraModal;
