import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import Logo from './logo';

const mockStore = configureMockStore();

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Logo type="header" />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });
});
