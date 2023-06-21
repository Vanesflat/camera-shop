import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import CamerasEmpty from './cameras-empty';

const mockStore = configureMockStore();

describe('Component: CamerasEmpty', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CamerasEmpty />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/По вашему запросу ничего не найдено/i)).toBeInTheDocument();
  });
});
