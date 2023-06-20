/* eslint-disable no-console */
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
import { getCurrentSortOrder, getCurrentSortType } from '../../store/reducers/sort/selectors';
import { categoryQueryValue, Level, levelQueryValue, sortOrderQueryValue, sortTypeQueryValue, Type, typeQueryValue } from '../../const';
import { getCurrentCategory, getCurrentLevels, getCurrentMaxPrice, getCurrentMinPrice, getCurrentTypes } from '../../store/reducers/filter/selectors';
import { QueryParam } from '../../types/query-param';

function CatalogPage(): JSX.Element {
  const camerasStatus = useAppSelector(getCamerasStatus);
  const promoStatus = useAppSelector(getPromoStatus);

  const currentSortOrder = useAppSelector(getCurrentSortOrder);
  const currentSortType = useAppSelector(getCurrentSortType);
  const currentCategory = useAppSelector(getCurrentCategory);
  const currentTypes = useAppSelector(getCurrentTypes);
  const currentLevels = useAppSelector(getCurrentLevels);
  const currentMinPrice = useAppSelector(getCurrentMinPrice);
  const currentMaxPrice = useAppSelector(getCurrentMaxPrice);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentParams = useMemo(() => {
    const params: QueryParam = {};

    if (currentSortOrder && currentSortType) {
      params.sortBy = sortTypeQueryValue[currentSortType];
      params.order = sortOrderQueryValue[currentSortOrder];
    } else if (!currentCategory && !currentTypes.length && !currentLevels.length && !currentMinPrice && !currentMaxPrice) {
      return;
    }

    if (currentCategory) {
      params.category = categoryQueryValue[currentCategory];
    }
    if (currentTypes) {
      params.type = currentTypes.map((item) => {
        item = typeQueryValue[item] as Type;

        return item;
      });
    }
    if (currentLevels) {
      params.level = currentLevels.map((item) => {
        item = levelQueryValue[item] as Level;

        return item;
      });
    }
    if (currentMinPrice) {
      params['price_gte'] = currentMinPrice.toString();
    }
    if (currentMaxPrice) {
      params['price_lte'] = currentMaxPrice.toString();
    }

    return params;
  }, [currentSortType, currentSortOrder, currentCategory, currentTypes, currentLevels, currentMinPrice, currentMaxPrice]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setSearchParams(currentParams);
  }, [setSearchParams, currentParams]);

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
