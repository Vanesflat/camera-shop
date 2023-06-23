import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import ProductCard from './product-card';
import { makeFakeCamera } from '../../utils/mocks';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, NameSpace, Status } from '../../const';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const camera = makeFakeCamera();
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.Basket]: {
    basketCameras: [],
    coupon: null,
    discount: 0,
    discountStatus: Status.Success,
    orderStatus: Status.Idle,
    totalCount: 0
  }
});

describe('Component: ProductCard', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductCard camera={camera} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('product-card')).toBeInTheDocument();
  });

  it('should redirect to product page when user clicked to link', async () => {
    history.push('/fake');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={`${AppRoute.Product}/${String(camera.id)}`}
              element={<h1>This is product page</h1>}
            />
            <Route
              path='*'
              element={<ProductCard camera={camera} />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/This is product page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/This is product page/i)).toBeInTheDocument();
  });
});
