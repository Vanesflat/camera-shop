import { useEffect } from 'react';
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
import { formatPrice } from '../../utils/app';
import ProductTabs from '../../components/product-tabs/product-tabs';

function ProductPage(): JSX.Element {
  const camera = useAppSelector(getCamera);
  const cameraStatus = useAppSelector(getCameraStatus);

  const cameraId = Number(useParams().id);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCameraAction(cameraId));
  }, [dispatch, cameraId]);

  if (!camera || cameraStatus.isLoading) {
    return <Loader />;
  }

  return (
    <Layout pageTitle='Продукт'>
      <main>
        <div className="page-content">
          <Breadcrumbs />
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
                  <div className="rate product__rate">
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                    <p className="visually-hidden">Рейтинг: 4</p>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{formatPrice(camera.price)} ₽</p>
                  <button className="btn btn--purple" type="button">
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
    </Layout>
  );
}

export default ProductPage;
