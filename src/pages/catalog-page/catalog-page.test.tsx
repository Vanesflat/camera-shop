import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace, Status } from '../../const';
import { makeFakeCamera, makeFakePromo } from '../../utils/mocks';
import { HelmetProvider } from 'react-helmet-async';
import CatalogPage from './catalog-page';
import HistoryRouter from '../../components/history-router/history-router';

const mockStore = configureMockStore([thunk]);

const cameras = [makeFakeCamera()];
const promo = makeFakePromo();

describe('Page: CatalogPage', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Cameras]: {
        cameras: cameras,
        status: Status.Success
      },
      [NameSpace.Promo]: {
        promo: promo,
        status: Status.Success
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <CatalogPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('catalog-page')).toBeInTheDocument();
  });
});
