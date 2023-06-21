import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import BasketBtn from './basket-btn';

const mockStore = configureMockStore();

describe('Component: BasketBtn', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketBtn />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('basket-btn')).toBeInTheDocument();
  });
});
