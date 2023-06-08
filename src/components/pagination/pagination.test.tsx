import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import Pagination from './pagination';

const mockStore = configureMockStore();

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Pagination currentPage={1} pageCount={5} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
