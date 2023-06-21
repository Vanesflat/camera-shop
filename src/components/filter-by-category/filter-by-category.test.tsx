import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import FilterByCategory from './filter-by-category';
import { NameSpace } from '../../const';

const mockStore = configureMockStore();

describe('Component: FilterByCategory', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Filter]: {
        category: null,
        types: [],
        levels: [],
        minPrice: 0,
        maxPrice: Infinity
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilterByCategory />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
  });
});
