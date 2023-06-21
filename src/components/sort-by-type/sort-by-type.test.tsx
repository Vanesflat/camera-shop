import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { NameSpace, SortOrder, SortType } from '../../const';
import SortByType from './sort-by-type';

const mockStore = configureMockStore();

describe('Component: SortByType', () => {
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
          <SortByType />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('sort-by-type')).toBeInTheDocument();
  });
});
