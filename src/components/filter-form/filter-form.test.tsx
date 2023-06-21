import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import FilterForm from './filter-form';
import { NameSpace, SortOrder, SortType, Status } from '../../const';
import { makeFakeCamera } from '../../utils/mocks';

const mockStore = configureMockStore();
const cameras = [makeFakeCamera()];

describe('Component: FilterForm', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Cameras]: {
        cameras: cameras,
        status: Status.Success
      },
      [NameSpace.Sort]: {
        sortOrder: SortOrder.Up,
        sortType: SortType.SortPrice
      },
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
          <FilterForm />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('filter-form')).toBeInTheDocument();
  });
});
