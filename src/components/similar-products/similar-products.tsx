import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getSimilarCameras } from '../../store/reducers/similar-products/selectors';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import ProductCard from '../product-card/product-card';

function SimilarProducts(): JSX.Element {
  const similarCameras = useAppSelector(getSimilarCameras);

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
    </div>
  );
}

export default SimilarProducts;
