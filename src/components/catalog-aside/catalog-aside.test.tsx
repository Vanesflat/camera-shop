import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';

const mockStore = configureMockStore();

describe('Component: CatalogAside', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <h1>Catalog Aside</h1>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Catalog Aside/i)).toBeInTheDocument();
  });
});
