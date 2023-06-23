import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import Catalog from './catalog';
import { NameSpace, SortOrder, SortType, Status } from '../../const';
import { makeFakeCamera } from '../../utils/mocks';

const mockStore = configureMockStore();
const cameras = [makeFakeCamera()];

describe('Component: Catalog', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Cameras]: {
        cameras: cameras,
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
          <Catalog />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('catalog')).toBeInTheDocument();
  });
});
