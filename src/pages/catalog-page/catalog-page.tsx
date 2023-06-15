import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogAside from '../../components/catalog-aside/catalog-aside';
import Layout from '../../components/layout/layout';
import { useEffect, useMemo } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { fetchCamerasAction } from '../../store/reducers/cameras/api-actions';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getCamerasStatus } from '../../store/reducers/cameras/selectors';
import Loader from '../../components/loader/loader';
import { fetchPromoAction } from '../../store/reducers/promo/api-actions';
import { getPromoStatus } from '../../store/reducers/promo/selectors';
import Catalog from '../../components/catalog/catalog';
import { useSearchParams } from 'react-router-dom';
import { getCurrentSortOrder, getCurrentSortType } from '../../store/reducers/app/selectors';
import { sortOrderQueryValue, sortTypeQueryValue } from '../../const';

function CatalogPage(): JSX.Element {
  const camerasStatus = useAppSelector(getCamerasStatus);
  const promoStatus = useAppSelector(getPromoStatus);

  const currentSortOrder = useAppSelector(getCurrentSortOrder);
  const currentSortType = useAppSelector(getCurrentSortType);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentParams = useMemo(() => {
    if (!currentSortOrder || !currentSortType) {
      return;
    }

    return {
      sortBy: sortTypeQueryValue[currentSortType],
      order: sortOrderQueryValue[currentSortOrder]
    };
  }, [currentSortType, currentSortOrder]);

  useEffect(() => {
    setSearchParams(currentParams);
  }, [setSearchParams, currentParams]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCamerasAction());
    dispatch(fetchPromoAction());
  }, [dispatch]);

  if (camerasStatus.isLoading || promoStatus.isLoading) {
    return <Loader />;
  }

  return (
    <Layout pageTitle="Каталог">
      <main data-testid="catalog-page">
        <Banner />
        <div className="page-content">
          <Breadcrumbs />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <CatalogAside />
                <Catalog searchParams={searchParams} />
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default CatalogPage;
