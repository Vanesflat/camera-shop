import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductCardsList from '../../components/product-cards-list/product-cards-list';
import CatalogAside from '../../components/catalog-aside/catalog-aside';
import Layout from '../../components/layout/layout';
import Sort from '../../components/sort/sort';
import Pagination from '../../components/pagination/pagination';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { fetchCamerasAction } from '../../store/reducers/cameras/api-actions';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getCameras, getCamerasStatus } from '../../store/reducers/cameras/selectors';
import Loader from '../../components/loader/loader';
import { fetchPromoAction } from '../../store/reducers/promo/api-actions';
import { getPromoStatus } from '../../store/reducers/promo/selectors';
import NotFoundPage from '../not-found-page/not-found-page';
import { useParams } from 'react-router-dom';

const CAMERAS_PER_PAGE = 9;

function CatalogPage(): JSX.Element {
  const cameras = useAppSelector(getCameras);
  const camerasStatus = useAppSelector(getCamerasStatus);

  const promoStatus = useAppSelector(getPromoStatus);

  const param = useParams().page;
  const currentPage = Number(param?.replace(/[^\d]/g, ''));

  const pageCount = Math.ceil(cameras.length / CAMERAS_PER_PAGE);
  const renderedCameras = cameras.slice((currentPage - 1) * CAMERAS_PER_PAGE, currentPage * CAMERAS_PER_PAGE);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCamerasAction());
    dispatch(fetchPromoAction());
  }, [dispatch]);

  if (camerasStatus.isLoading || promoStatus.isLoading) {
    return <Loader />;
  }

  if (currentPage > pageCount || !currentPage) {
    return <NotFoundPage />;
  }

  return (
    <Layout pageTitle='Каталог'>
      <main>
        <Banner />
        <div className="page-content">
          <Breadcrumbs />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <CatalogAside />
                <div className="catalog__content">
                  <Sort />
                  <ProductCardsList cameras={renderedCameras} />
                  {pageCount > 1 && <Pagination currentPage={currentPage} pageCount={pageCount} />}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default CatalogPage;
