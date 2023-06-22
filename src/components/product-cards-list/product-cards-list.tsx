import { useState } from 'react';
import { Camera } from '../../types/camera';
import AddCameraModal from '../add-camera-modal/add-camera-modal';
import AddCameraSuccessModal from '../add-camera-success-modal/add-camera-success-modal';
import ProductCard from '../product-card/product-card';

type ProductCardsListProps = {
  cameras: Camera[];
}

function ProductCardsList({ cameras }: ProductCardsListProps): JSX.Element {
  const [openedAddModal, setOpenedAddModal] = useState(false);
  const [openedAddSuccessModal, setOpenedAddSuccessModal] = useState(false);
  const [currentCamera, setCurrentCamera] = useState<Camera>(cameras[0]);

  const handleAddModalCloseClick = () => {
    setOpenedAddModal(false);
  };

  const handleAddSuccessModalCloseClick = () => {
    setOpenedAddSuccessModal(false);
  };

  return (
    <div className="cards catalog__cards" data-testid="product-cards-list">
      {cameras.map((camera) => <ProductCard camera={camera} key={camera.id} setOpenedAddModal={setOpenedAddModal} setCurrentCamera={setCurrentCamera} />)}
      <AddCameraModal
        isOpen={openedAddModal}
        camera={currentCamera}
        onCloseCLick={handleAddModalCloseClick}
        setOpenedAddSuccessModal={setOpenedAddSuccessModal}
      />
      <AddCameraSuccessModal isOpen={openedAddSuccessModal} onCloseCLick={handleAddSuccessModalCloseClick} />
    </div>
  );
}

export default ProductCardsList;
