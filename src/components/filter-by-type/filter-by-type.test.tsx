import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import FilterByType from './filter-by-type';
import { NameSpace } from '../../const';

const mockStore = configureMockStore();

describe('Component: FilterByType', () => {
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
          <FilterByType />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Тип камеры/i)).toBeInTheDocument();
  });
});
