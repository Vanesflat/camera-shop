import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { AppRoute, NameSpace, Status } from '../../const';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import Banner from './banner';
import { makeFakeCamera, makeFakePromo } from '../../utils/mocks';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const cameras = [makeFakeCamera()];
const promo = makeFakePromo();
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.Promo]: {
    promo: promo,
    status: Status.Idle
  },
  [NameSpace.Cameras]: {
    cameras: cameras,
    status: Status.Idle
  }
});


describe('Component: Banner', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Banner />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Новинка!/i)).toBeInTheDocument();
  });

  it('should redirect to product page when user clicked to link', async () => {
    history.push('/fake');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={`${AppRoute.Product}/${promo.id}`}
              element={<h1>This is product page</h1>}
            />
            <Route
              path='*'
              element={<Banner />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/This is product page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/This is product page/i)).toBeInTheDocument();
  });
});
