import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import FilterByPrice from './filter-by-price';

const mockStore = configureMockStore();
describe('Component: FilterByPrice', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilterByPrice />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Цена, ₽/i)).toBeInTheDocument();
  });
});
