import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, NameSpace, SortOrder, SortType, Status } from '../../const';
import App from './app';
import HistoryRouter from '../history-router/history-router';
import { createAPI } from '../../services/api';
import { State } from '../../types/store';
import { makeFakeCamera, makeFakePromo, makeFakeReview } from '../../utils/mocks';
import { generatePath } from 'react-router-dom';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();

const camera = makeFakeCamera();
const cameras = [makeFakeCamera()];
const similarCameras = [makeFakeCamera()];
const promo = makeFakePromo();
const reviews = [makeFakeReview()];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const store = mockStore({
  [NameSpace.Camera]: {
    camera: camera,
    status: Status.Success
  },
  [NameSpace.Cameras]: {
    cameras: cameras,
    status: Status.Success
  },
  [NameSpace.Promo]: {
    promo: promo,
    status: Status.Success
  },
  [NameSpace.Reviews]: {
    reviews: reviews,
    status: Status.Success,
    postStatus: Status.Success
  },
  [NameSpace.SimilarCameras]: {
    similarCameras: similarCameras,
    status: Status.Success
  },
  [NameSpace.Sort]: {
    sortOrder: SortOrder.Up,
    sortType: SortType.SortPrice
  },
  [NameSpace.Filter]: {
    category: null,
    types: [],
    levels: [],
    minPrice: 0,
    maxPrice: Infinity
  }
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "CatalogPage" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('should render "CatalogPage" when user navigate to "/catalog/page_1"', () => {
    history.push(generatePath(AppRoute.Catalog, { page: 'page_1' }));

    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('should render "BasketPage" when user navigate to "/basket"', () => {
    history.push(AppRoute.Basket);

    render(fakeApp);

    expect(screen.getByTestId('basket-page')).toBeInTheDocument();
  });

  it('should render "ProductPage" when user navigate to "/product/1"', () => {
    history.push(`${AppRoute.Product}/1`);

    render(fakeApp);

    expect(screen.getByTestId('product-page')).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});
