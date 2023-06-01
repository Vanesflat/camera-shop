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
import { getCamerasStatus } from '../../store/reducers/cameras/selectors';
import Loader from '../../components/loader/loader';

function CatalogPage(): JSX.Element {
  const camerasStatus = useAppSelector(getCamerasStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCamerasAction());
  }, [dispatch]);

  if (camerasStatus.isLoading) {
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
                  <ProductCardsList />
                  <Pagination />
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
