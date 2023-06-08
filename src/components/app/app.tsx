import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import BasketPage from '../../pages/basket-page/basket-page';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import ProductPage from '../../pages/product-page/product-page';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage />}
        />
        <Route
          path={AppRoute.Catalog}
          element={<CatalogPage />}
        />
        <Route
          path={AppRoute.Basket}
          element={<BasketPage />}
        />
        <Route
          path={AppRoute.Product}
          element={<ProductPage />}
        />
        <Route
          path='*'
          element={<NotFoundPage />}
        />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
