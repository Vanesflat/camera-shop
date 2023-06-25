import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import BasketItem from './basket-item';
import { makeFakeCamera } from '../../utils/mocks';
import { BasketItemType } from '../../const';

const mockStore = configureMockStore();
const camera = makeFakeCamera();

describe('Component: BasketItem', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketItem camera={camera} type={BasketItemType.Standart} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Общая цена/i)).toBeInTheDocument();
  });
});
