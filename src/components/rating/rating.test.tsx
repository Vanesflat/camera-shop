import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import Rating from './rating';

const mockStore = configureMockStore();

describe('Component: Rating', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Rating rating={0} reviewCount={1} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Рейтинг:/i)).toBeInTheDocument();
    expect(screen.getByText(/Всего оценок:/i)).toBeInTheDocument();
  });
});
