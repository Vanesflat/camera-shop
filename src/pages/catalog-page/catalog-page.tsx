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
import { Category, Level, SortOrder, sortOrderQueryValue, SortType, Type } from '../../const';
import { getCurrentCategory, getCurrentLevels, getCurrentMaxPrice, getCurrentMinPrice, getCurrentTypes } from '../../store/reducers/filter/selectors';
import { QueryParam } from '../../types/query-param';
import { changeCategory, changeLevel, changeType, setMaxPrice, setMinPrice } from '../../store/reducers/filter/filter';
import { capitalizeFirstLetter } from '../../utils/common';
import { changeSortOrder, changeSortType } from '../../store/reducers/sort/sort';

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

  const sortType = searchParams.get('sortBy');
  const sortOrder = searchParams.get('order');

  const category = searchParams.get('category');
  const type: string[] = [];
  const level: string[] = [];
  const priceGte = searchParams.get('price_gte');
  const priceLte = searchParams.get('price_lte');

  for (const [key, value] of searchParams.entries()) {
    if (key === 'type' && !type.includes(value)) {
      type.push(value);
    }

    if (key === 'level' && !level.includes(value)) {
      level.push(value);
    }
  }

  const currentParams = useMemo(() => {
    const params: QueryParam = {};

    if (currentSortOrder && currentSortType) {
      params.sortBy = currentSortType;
      params.order = sortOrderQueryValue[currentSortOrder];
    } else if (!currentCategory && !currentTypes.length && !currentLevels.length && !currentMinPrice && !currentMaxPrice) {
      return;
    }
    if (currentCategory) { params.category = currentCategory; }
    if (currentTypes) { params.type = currentTypes; }
    if (currentLevels) { params.level = currentLevels; }
    if (currentMinPrice) { params['price_gte'] = currentMinPrice.toString(); }
    if (currentMaxPrice) { params['price_lte'] = currentMaxPrice.toString(); }

    return params;
  }, [currentSortType, currentSortOrder, currentCategory, currentTypes, currentLevels, currentMinPrice, currentMaxPrice]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (sortType && sortOrder) {
      dispatch(changeSortType(sortType as SortType));
      dispatch(changeSortOrder(sortOrder === sortOrderQueryValue[SortOrder.Up] ? SortOrder.Up : SortOrder.Down));
    }
  }, [sortType, sortOrder, dispatch]);

  useEffect(() => {
    if (category) {
      dispatch(changeCategory(capitalizeFirstLetter(category) as Category));
    }
  }, [category, dispatch]);

  useEffect(() => {
    if (priceGte) {
      dispatch(setMinPrice(+priceGte));
    }

    if (priceLte) {
      dispatch(setMaxPrice(+priceLte));
    }
  }, [priceGte, priceLte, dispatch]);

  useEffect(() => {
    if (type.length) {
      type.forEach((item) => {
        dispatch(changeType(capitalizeFirstLetter(item) as Type));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (level.length) {
      level.forEach((item) => {
        dispatch(changeLevel(capitalizeFirstLetter(item) as Level));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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
                <Catalog />
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default CatalogPage;
