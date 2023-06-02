import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductCardsList from '../../components/product-cards-list/product-cards-list';
import CatalogAside from '../../components/catalog-aside/catalog-aside';
import Layout from '../../components/layout/layout';
import Sort from '../../components/sort/sort';
import Pagination from '../../components/pagination/pagination';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { fetchCamerasAction } from '../../store/reducers/cameras/api-actions';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getCameras, getCamerasStatus } from '../../store/reducers/cameras/selectors';
import Loader from '../../components/loader/loader';
import { fetchPromoAction } from '../../store/reducers/promo/api-actions';
import { getPromoStatus } from '../../store/reducers/promo/selectors';

const CAMERAS_PER_PAGE = 9;

function CatalogPage(): JSX.Element {
  const cameras = useAppSelector(getCameras);
  const camerasStatus = useAppSelector(getCamerasStatus);

  const promoStatus = useAppSelector(getPromoStatus);

  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(cameras.length / CAMERAS_PER_PAGE);
  const renderedCameras = cameras.slice((currentPage - 1) * CAMERAS_PER_PAGE, currentPage * CAMERAS_PER_PAGE);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCamerasAction());
    dispatch(fetchPromoAction());
  }, [dispatch]);

  const onPageClick = (page: number) => {
    setCurrentPage(page);
  };

  if (camerasStatus.isLoading || promoStatus.isLoading) {
    return <Loader />;
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
                  {pageCount > 1 && <Pagination currentPage={currentPage} pageCount={pageCount} onClick={onPageClick} />}
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
