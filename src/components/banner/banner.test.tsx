import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { NameSpace, Status } from '../../const';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import Banner from './banner';
import { makeFakeCamera, makeFakePromo } from '../../utils/mocks';

const mockStore = configureMockStore();
const cameras = [makeFakeCamera()];
const promo = makeFakePromo();


describe('Component: Banner', () => {
  it('should render correctly', () => {
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

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Banner />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Новинка!/i)).toBeInTheDocument();
  });
});
