import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import SearchForm from './search-form';
import { NameSpace, Status } from '../../const';
import { makeFakeCamera } from '../../utils/mocks';

const mockStore = configureMockStore();
const cameras = [makeFakeCamera()];

describe('Component: SearchForm', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Cameras]: {
        cameras: cameras,
        status: Status.Success
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SearchForm />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
  });
});
