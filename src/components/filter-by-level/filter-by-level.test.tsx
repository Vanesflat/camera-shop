import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import FilterByLevel from './filter-by-level';

const mockStore = configureMockStore();
describe('Component: FilterByLevel', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilterByLevel />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Уровень/i)).toBeInTheDocument();
  });
});
