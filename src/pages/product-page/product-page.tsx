import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Layout from '../../components/layout/layout';
import Loader from '../../components/loader/loader';
import ReviewBlock from '../../components/review-block/review-block';
import SimilarProducts from '../../components/similar-products/similar-products';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { fetchCameraAction } from '../../store/reducers/camera/api-actions';
import { getCamera, getCameraStatus } from '../../store/reducers/camera/selectors';
import { formatPrice } from '../../utils/common';
import ProductTabs from '../../components/product-tabs/product-tabs';
import { fetchReviewsAction } from '../../store/reducers/reviews/api-actions';
import { getReviews, getReviewsStatus } from '../../store/reducers/reviews/selectors';
import { fetchSimilarCamerasAction } from '../../store/reducers/similar-products/api-actions';
import { getSimilarCamerasStatus } from '../../store/reducers/similar-products/selectors';
import Rating from '../../components/rating/rating';
import { getAverageRate } from '../../utils/review';
import AddCameraModal from '../../components/add-camera-modal/add-camera-modal';
import AddCameraSuccessModal from '../../components/add-camera-success-modal/add-camera-success-modal';

function ProductPage(): JSX.Element {
  const camera = useAppSelector(getCamera);
  const cameraStatus = useAppSelector(getCameraStatus);
  const reviews = useAppSelector(getReviews);
  const reviewsStatus = useAppSelector(getReviewsStatus);
  const similarCamerasStatus = useAppSelector(getSimilarCamerasStatus);

  const [openedAddModal, setOpenedAddModal] = useState(false);
  const [openedAddSuccessModal, setOpenedAddSuccessModal] = useState(false);

  const rating = getAverageRate(reviews);

  const cameraId = Number(useParams().id);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCameraAction(cameraId));
    dispatch(fetchReviewsAction(cameraId));
    dispatch(fetchSimilarCamerasAction(cameraId));
  }, [dispatch, cameraId]);

  const handleUpClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleAddBasketClick = () => {
    setOpenedAddModal(true);
  };

  const handleAddModalCloseClick = () => {
    setOpenedAddModal(false);
  };

  const handleAddSuccessModalCloseClick = () => {
    setOpenedAddSuccessModal(false);
  };

  if (!camera || cameraStatus.isLoading || reviewsStatus.isLoading || similarCamerasStatus.isLoading) {
    return <Loader />;
  }

  return (
    <Layout pageTitle={camera.name}>
      <main>
        <div className="page-content" data-testid="product-page">
          <Breadcrumbs path={camera.name} />
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`} />
                    <img src={camera.previewImg} srcSet={camera.previewImg2x} width="560" height="480" alt={camera.name} />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{camera.name}</h1>
                  <Rating rating={rating} reviewCount={camera.reviewCount} />
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{formatPrice(camera.price)} ₽</p>
                  <button
                    className="btn btn--purple"
                    type="button"
                    onClick={handleAddBasketClick}
                  >
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>
                    Добавить в корзину
                  </button>
                  <ProductTabs camera={camera} />
                </div>
              </div>
            </section>
          </div>
          <SimilarProducts />
          <ReviewBlock />
        </div>
      </main>
      <button className="up-btn" onClick={handleUpClick}>
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </button>
      <AddCameraModal
        isOpen={openedAddModal}
        camera={camera}
        onCloseCLick={handleAddModalCloseClick}
        setOpenedAddSuccessModal={setOpenedAddSuccessModal}
      />
      <AddCameraSuccessModal isOpen={openedAddSuccessModal} onCloseCLick={handleAddSuccessModalCloseClick} />
    </Layout>
  );
}

export default ProductPage;
