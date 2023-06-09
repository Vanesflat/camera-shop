import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import Sort from './sort';
import { NameSpace, SortOrder, SortType } from '../../const';

const mockStore = configureMockStore();

describe('Component: Sort', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Sort]: {
        sortOrder: SortOrder.Up,
        sortType: SortType.SortPrice
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Sort />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
  });
});
