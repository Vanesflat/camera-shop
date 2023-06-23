import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace, SortOrder, SortType, Status } from '../../const';
import { makeFakeCamera, makeFakePromo } from '../../utils/mocks';
import { HelmetProvider } from 'react-helmet-async';
import CatalogPage from './catalog-page';
import HistoryRouter from '../../components/history-router/history-router';

const mockStore = configureMockStore([thunk]);

const cameras = [makeFakeCamera()];
const promo = makeFakePromo();

describe('Page: CatalogPage', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Cameras]: {
        cameras: cameras,
        status: Status.Success
      },
      [NameSpace.Promo]: {
        promo: promo,
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
      },
      [NameSpace.Basket]: {
        basketCameras: [],
        coupon: null,
        discount: 0,
        discountStatus: Status.Success,
        orderStatus: Status.Idle,
        totalCount: 0
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <CatalogPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('catalog-page')).toBeInTheDocument();
  });
});
