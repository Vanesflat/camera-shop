import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import BasketList from './basket-list';
import { NameSpace, Status } from '../../const';

const mockStore = configureMockStore();

describe('Component: BasketList', () => {
  it('should render correctly', () => {
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

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketList />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('basket-list')).toBeInTheDocument();
  });
});