import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';

const mockStore = configureMockStore();

describe('Component: Sort', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <h1>Fake Sort</h1>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Fake Sort:/i)).toBeInTheDocument();
  });
});
