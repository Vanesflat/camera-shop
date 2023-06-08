import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import FilterForm from './filter-form';

const mockStore = configureMockStore();
describe('Component: FilterForm', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

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
