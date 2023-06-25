import { useState } from 'react';
import { BasketItemType } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getBasketCameras } from '../../store/reducers/basket/selectors';
import { Camera } from '../../types/camera';
import BasketItem from '../basket-item/basket-item';
import BasketListEmpty from '../basket-list-empty/basket-list-empty';
import BasketRemoveCameraModal from '../basket-remove-camera-modal/basket-remove-camera-modal';

function BasketList(): JSX.Element {
  const basketCameras = useAppSelector(getBasketCameras);

  const [openedRemoveModal, setOpenedRemoveModal] = useState(false);
  const [currentCamera, setCurrentCamera] = useState<Camera>({} as Camera);

  const handleRemoveModalCloseClick = () => {
    setOpenedRemoveModal(false);
  };

  return (
    <>
      <ul className="basket__list" data-testid="basket-list">
        {!basketCameras.length
          ? <BasketListEmpty />
          : basketCameras.map((camera) => (
            <BasketItem
              camera={camera}
              type={BasketItemType.Standart}
              setOpenedRemoveModal={setOpenedRemoveModal}
              setCurrentCamera={setCurrentCamera}
              key={camera.id}
            />))}
      </ul>
      <BasketRemoveCameraModal
        camera={currentCamera}
        isOpen={openedRemoveModal}
        onCloseCLick={handleRemoveModalCloseClick}
      />
    </>
  );
}

export default BasketList;
