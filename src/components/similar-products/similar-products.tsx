import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getSimilarCameras } from '../../store/reducers/similar-products/selectors';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import ProductCard from '../product-card/product-card';
import { Camera } from '../../types/camera';
import { useState } from 'react';
import AddCameraModal from '../add-camera-modal/add-camera-modal';
import AddCameraSuccessModal from '../add-camera-success-modal/add-camera-success-modal';

function SimilarProducts(): JSX.Element {
  const similarCameras = useAppSelector(getSimilarCameras);

  const [openedAddModal, setOpenedAddModal] = useState(false);
  const [openedAddSuccessModal, setOpenedAddSuccessModal] = useState(false);
  const [currentCamera, setCurrentCamera] = useState<Camera>(similarCameras[0]);

  const handleAddModalCloseClick = () => {
    setOpenedAddModal(false);
  };

  const handleAddSuccessModalCloseClick = () => {
    setOpenedAddSuccessModal(false);
  };

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <Swiper
              className="product-similar__slider-list"
              modules={[Navigation]}
              spaceBetween={32}
              slidesPerView={3}
              slidesPerGroup={3}
              navigation={
                {
                  nextEl: '.slider-controls--next',
                  prevEl: '.slider-controls--prev'
                }
              }
            >
              {similarCameras.map((similarCamera) => (
                <SwiperSlide key={similarCamera.id} >
                  <ProductCard
                    style={{
                      width: '100%',
                      margin: 0
                    }}
                    camera={similarCamera}
                    setOpenedAddModal={setOpenedAddModal}
                    setCurrentCamera={setCurrentCamera}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              className="slider-controls slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"
              style={{ pointerEvents: 'auto' }}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button
              className="slider-controls slider-controls--next"
              type="button"
              aria-label="Следующий слайд"
              style={{ pointerEvents: 'auto' }}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          </div>
        </div>
      </section>
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

export default SimilarProducts;
